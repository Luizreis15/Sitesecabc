# Mapa de 301 — URLs antigas do WordPress

**Status: preparado, não aplicado.** Nenhum destes arquivos está em uso no `vercel.json` atual. Este documento existe para que a aplicação, quando decidida, seja só copiar/colar sem redescobrir nada.

## O que muda em relação ao levantamento da rodada 1

1. **Rotas de infraestrutura do WordPress removidas do mapa.** `/wp-admin/`, `/wp-login.php`, `/wp-json/`, `/xmlrpc.php`, `/wp-includes/` já respondem 404 real via `vercel.json` (bloco de rotas no topo, aplicado nesta rodada). Elas não recebem redirect — receber um 301 sinalizaria a bots que existe algo ali para onde ir; um 404 (ou o bloqueio automático que a própria Vercel já aplica a esses caminhos, ver nota abaixo) encerra o assunto.
2. **O PDF da CCT 2019/2020 não redireciona para uma página HTML.** `/secabc/wp-content/uploads/2020/01/Varejista-2019-2020.pdf` agora responde **410 Gone** — testado e funcional na Vercel via `"status": 410"` no `routes`. Quando o SECABC publicar a convenção vigente no site, trocar essa regra por um 301 para o documento novo.
3. **Nenhum destino aponta para `/noticias` neste arquivo por padrão** sem antes você decidir a pergunta abaixo.

## Decisão pendente: sequenciamento

Metade dos destinos deste mapa é `/noticias`. Enquanto essa página exibir "Nenhuma notícia publicada no momento.", redirecionar URLs indexadas para lá é pior do que o soft 404 atual — o visitante clica em algo que prometia conteúdo e cai numa página que anuncia que não tem nada.

Duas opções, dois arquivos prontos, escolha um:

- **`redirects-301-proposal.json`** — destinos apontam para `/noticias`. Use este quando os primeiros artigos estiverem publicados.
- **`redirects-301-proposal-home-fallback.json`** — os mesmos destinos que hoje seriam `/noticias` apontam para `/` (home) como solução temporária. Aplicar agora, e trocar para o arquivo acima assim que `/noticias` tiver conteúdo.

Não crie um terceiro híbrido manualmente sem necessidade — os dois arquivos são idênticos exceto nessas linhas, para facilitar a troca.

## Como aplicar (quando decidido)

1. Escolher um dos dois arquivos acima.
2. Copiar as entradas de dentro de `"routes": [...]` para dentro do array `routes` do `vercel.json` real, **inserindo-as ANTES** do bloco de regras do WordPress (`/wp-admin`, `/wp-content` etc.) e antes de `{ "handle": "filesystem" }`.
3. **Atenção especial à ordem:** a regra do PDF (`/secabc/wp-content/uploads/...`) precisa continuar vindo antes da regra genérica `^/wp-content(/.*)?$` no `vercel.json` final. A primeira regra que casar "vence" — se a genérica vier antes, o PDF nunca chega a ser avaliado pela regra específica e cai no 404 genérico do wp-content (o que, na prática, não é um erro grave — ele já é 410/404 de qualquer forma — mas perde a precisão de status e a facilidade de trocar por um 301 depois).
4. Rodar `npm run build` local só para confirmar que o JSON é válido (o build não valida `vercel.json`, mas um erro de sintaxe JSON quebra o deploy inteiro — vale um `node -e "JSON.parse(require('fs').readFileSync('vercel.json'))"` antes de subir).
5. Fazer deploy de preview e testar cada URL da tabela abaixo antes de promover para produção.

## Achado importante: acentos nas URLs

Testado empiricamente nesta rodada, com deploy real (não é suposição de documentação): **o `src` das regras do `vercel.json` casa contra o path exatamente como o navegador envia na requisição — sempre percent-encoded, nunca com o caractere acentuado literal.**

- Regra escrita como `^/notícias/page/...` (acento literal): **não casa nunca.** Testado, confirmado — cai no fallback.
- Regra escrita como `^/not%C3%ADcias/page/...` (percent-encoded): **casa corretamente.** Testado, confirmado — o 301 disparou.

Isso não é opcional nem os dois formatos funcionam de forma equivalente — só o percent-encoded funciona. Os dois arquivos deste mapa já usam a forma percent-encoded correta em todas as rotas com acento (`not%C3%ADcias`, `c%C3%B3pia-homologa%C3%A7%C3%A3o`). Não reescrever essas linhas com acento literal ao editar.

## Nota sobre o WAF automático da Vercel

Ao testar as rotas de WordPress do item 3, percebi que a própria Vercel já bloqueia automaticamente caminhos como `/wp-admin/*` e variantes de `/wp-content/*` com **403 Forbidden** (`x-vercel-mitigated: deny`) para tráfego anônimo comum, antes mesmo de qualquer regra deste projeto ser avaliada — é proteção de plataforma contra sondagem automatizada, não é algo que configuramos. Na prática isso significa duas coisas:

- O usuário/bot comum vai ver 403, não 404, ao acessar essas rotas — o que já resolve o problema descrito no briefing (sinalizar "não há nada aqui") de forma até mais forte que um 404 simples.
- Se algum dia o WAF da Vercel decidir não interceptar um caminho específico (mudança de heurística fora do nosso controle), a regra do `vercel.json` deste projeto garante o mesmo resultado como camada de segurança adicional — confirmado via teste com bypass de proteção (`vercel curl`), que mostrou o 404 real vindo da nossa própria configuração.
- Isso também vale para a regra do PDF: se o WAF da Vercel decidir tratar `/secabc/wp-content/...` como rota suspeita e bloquear com 403 antes de chegar às nossas regras, o PDF nunca vai de fato mostrar 410 para tráfego anônimo comum — só para tráfego que passa pelo WAF (a maioria dos usuários reais navegando um link antigo, já que o WAF foca em padrões de bot). Não é um problema a resolver, só um comportamento a conhecer.

## Tabela de referência

| URL antiga | Destino proposto | Status |
|---|---|---|
| `/secabc/o-sindicato/onde-estamos/` | `/sedes-regionais` | 301 |
| `/beneficios_pagina/sede-sindical/` | `/o-sindicato` | 301 |
| `/beneficios_pagina/fmu-centro-universitario-ead/` | `/beneficios/convenios` | 301 |
| `/beneficios_pagina/universidade-estacio-de-sa/` | `/beneficios/convenios` | 301 |
| `/beneficios_pagina/colegio-brasilia-sbc/` | `/beneficios/convenios` | 301 |
| `/juridico` | `/beneficios/juridico` | 301 |
| `/cópia-homologação` | `/servicos/homologacoes` | 301 |
| `/notícias/page/:num` | `/noticias` (ou `/` na variante home-fallback) | 301 |
| `/category/*` | `/noticias` (ou `/` na variante home-fallback) | 301 |
| `/secabc/wp-content/uploads/2020/01/Varejista-2019-2020.pdf` | — | **410** |
| `/secabc/*` (fallback genérico para o resto do prefixo antigo, incl. os dois posts de notícia sem correspondente direto) | `/noticias` (ou `/` na variante home-fallback) | 301 |
| `/servicos`, `/parceiros`, `/sedes-regionais`, `/beneficios` | — (já coincidem com as rotas atuais) | sem ação |
| `/wp-admin/`, `/wp-login.php`, `/wp-json/`, `/xmlrpc.php`, `/wp-includes/` | — (tratado no item 3) | 404 |
