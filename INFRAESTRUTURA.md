# Infraestrutura — SECABC

> Registro do que existe hoje e onde. Atualizar sempre que algo mudar de lugar — isto não é um relatório pontual, é a referência viva de "onde está cada coisa".

---

## ⚠️ Antes de cancelar qualquer hospedagem

**A conta de hospedagem original (fora da Vercel) não pode ser cancelada sem antes migrar o e-mail institucional.** O domínio `secabc.org.br` tem registro MX apontando para `mail.secabc.org.br`, que resolve para um servidor separado da Vercel (ver seção E-mail abaixo). O endereço `adm@secabc.org.br` aparece em todas as páginas do site como contato oficial — se esse servidor de e-mail cair, a caixa de entrada institucional do sindicato para.

Cancelar a hospedagem sem migrar o e-mail primeiro derruba o e-mail do sindicato, não só um site antigo.

---

## Site — Vercel

- **Hospedagem:** Vercel, projeto `sitesecabc` (`prj_J52nmINThXtTNCgV4n9CNvajvYwl`), organização "Luiz's projects".
- **Domínio:** `secabc.org.br` (apex, redireciona 307 para `www`) e `www.secabc.org.br`. Ambos com DNS apontando para a Vercel:
  - Apex: registro A → `216.198.79.1` (IP anycast da Vercel)
  - `www`: CNAME → `815e9d54d0317821.vercel-dns-017.com`
  - Nameservers do domínio: `ns1.sunlineasp.com.br` / `ns2.sunlineasp.com.br`
- **Deploy:** integração Git nativa da Vercel com o repositório GitHub `Luizreis15/Sitesecabc`. Push em qualquer branch gera deploy de **Preview** automaticamente; merge em `main` dispara deploy de **Production**. Fluxo completo documentado no `README.md`.
- **Build:** `npm run build` → `node tools/generate-llms.js` (não bloqueia o build se falhar) → `node tools/generate-sitemap.js` (bloqueia o build se falhar) → `vite build`.
- **Roteamento (`vercel.json`):** usa o formato legado `routes` (não `rewrites`/`redirects` simples) porque `routes` é o único que permite `"status"` explícito, necessário para os 404 reais das rotas de WordPress. Ver comentários no próprio arquivo para a ordem das regras — ordem importa, a primeira regra que casar vence.
- **Deployment Protection:**
  - SSO protection nos deploys de Preview: **desativada** nesta rodada (`vercel project protection disable sitesecabc --sso`), para permitir revisão sem exigir conta no time da Vercel. Antes disso, cobria "todos os deployments exceto domínios customizados" — ou seja, nunca afetou produção (`www.secabc.org.br`), só as URLs `*.vercel.app`.
  - Deploys de Preview continuam com header `x-robots-tag: noindex` (padrão da Vercel para o ambiente Preview, independente da SSO) — confirmado por teste direto.
  - Existe um "Protection Bypass for Automation" configurado no projeto (usado pelo comando `vercel curl` para testar deploys programaticamente).
  - A própria Vercel aplica bloqueio automático (`x-vercel-mitigated: deny`, HTTP 403) contra tráfego que parece sondagem de bot em caminhos como `/wp-admin/*` — isso é proteção de plataforma, não uma configuração deste projeto.

## Variáveis de ambiente

`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`, configuradas na Vercel em:
- **Production** — desde a configuração original do projeto.
- **Preview** — adicionadas na primeira rodada de correção emergencial; antes disso, todo deploy de preview subia com o formulário de contato quebrado por falta dessas variáveis.

Conferir com `vercel env ls`. Localmente, replicar em `.env.local` (nunca commitado — está no `.gitignore`).

## E-mail

- Registro MX do domínio: `mail.secabc.org.br` (prioridade 0).
- Esse hostname resolve para `177.234.159.211` — **não é a Vercel**, é um servidor de hospedagem separado (faixa de IP típica de hospedagem brasileira, provavelmente a mesma conta Hostinger original, dado o resíduo de configuração Apache encontrado no `.htaccess` do projeto).
- SPF do domínio: `v=spf1 ip4:177.234.159.211 +a +mx +ip4:187.45.189.162 ~all` — confirma que o envio de e-mail passa por infraestrutura própria, fora da Vercel.
- `adm@secabc.org.br` é o endereço institucional exibido no site (header, rodapé, `/links`, formulário de contato).

## O que ainda precisa ser confirmado no hPanel (ou painel equivalente de hospedagem)

Ninguém nesta correção teve acesso ao painel de hospedagem — tudo abaixo foi inferido de fora (DNS, HTTP, cache) e precisa de confirmação direta de quem administra a conta:

1. **A instalação WordPress antiga ainda existe nos arquivos da hospedagem?** DNS já não aponta tráfego web para lá (confirmado: tanto o apex quanto `www` resolvem 100% para a Vercel), mas isso não prova que os arquivos foram apagados — só que ninguém os visita mais pelo domínio principal. Se a instalação segue lá, ocupando espaço/sendo alvo de sondagem por IP direto ou por algum subdomínio não mapeado no DNS público, vale saber antes de decidir o que fazer com a conta.
2. **Essa mesma conta de hospedagem é a que serve o e-mail (`mail.secabc.org.br`, IP `177.234.159.211`)?** Assumindo que sim pela coincidência de padrão, mas não foi confirmado diretamente — se for uma conta diferente, o aviso da seção "Antes de cancelar" pode não se aplicar do jeito que está escrito, e vale corrigir este documento.
3. **Existem outros subdomínios ou registros DNS não descobertos nesta checagem**, apontando para a hospedagem original? Só foi possível checar os hostnames óbvios (`secabc.org.br`, `www`, `mail`) — uma varredura completa do painel de DNS ou do hPanel é a única forma de ter certeza.

## ⚠️ Achado urgente (rodada 2): imagens do CDN `horizons-cdn.hostinger.com` sem arquivo de origem

Não fazia parte do briefing desta rodada — encontrado ao procurar o logo oficial para gerar o favicon, registrado aqui por ser urgente e ter prazo.

Todas as imagens do projeto hospedadas em `https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/...` (logo do cabeçalho, foto da diretoria, fotos de sedes, logos de parceiros, imagem do documento de homologação, e provavelmente outras que usam o mesmo prefixo) estão retornando **404 "NoSuchKey" direto na origem do CDN**. Testado com 5 URLs diferentes desse prefixo — todas falharam.

- **Por que ainda aparecem no site:** o CDN cacheia respostas por até 7 dias (`cache-control: public, max-age=604800`), incluindo caches negativos de erro 404. Cada imagem vai sumir silenciosamente conforme o cache da borda que a serve expirar — sem aviso, em datas diferentes para cada imagem/região.
- **O que evita quebra visível quando isso acontecer:** o componente `Img` (`src/components/Img.jsx`, criado na rodada 1) já troca automaticamente qualquer imagem quebrada por um placeholder no navy/dourado da marca — então o resultado não será um ícone de imagem quebrada, mas o logo do cabeçalho, as fotos da diretoria e sedes, etc., vão virar genéricos.
- **O que precisa ser decidido:** essas imagens precisam ser baixadas (enquanto ainda carregam) e re-hospedadas localmente em `public/images/`, como já foi feito com outras imagens do projeto (ex.: `Logo_secabc.png`, usado para gerar o favicon nesta rodada, é uma cópia local não afetada por esse problema). Esse é um trabalho de escopo médio — dezenas de imagens, provavelmente a maioria do que usa esse CDN — e não foi feito aqui porque não estava no briefing desta rodada.

## Pendências conhecidas (não é para mexer sem pedido explícito)

- Fotos genéricas do Unsplash nas páginas de sede (`SedeRegional.jsx`) e URL com typo (`539mmy4a`) na foto do presidente de São Bernardo — pendente desde antes desta correção, documentado também no `CLAUDE.md`.
- O mesmo problema de captura de scroll no mapa incorporado do Google Maps existe em `/beneficios/centro-de-lazer` (Complexo Eco) — só o mapa de `/contato` foi corrigido, porque era o único citado no briefing da rodada 1.
- `src/components/ui/sonner.jsx` referencia os pacotes `next-themes` e `sonner`, que não estão instalados — gera erro de lint pré-existente, não usado em nenhuma página ativa do projeto.
- A paleta de cores dos tokens Tailwind atuais (`primary #134C8A`, `accent #F6A52A`) diverge da paleta usada nas peças de rede social e no briefing do projeto de blog (`#14325D`, `#F9C31F`) — decisão de marca a ser tomada pelo cliente, não uma correção de código.
- `public/favicon.svg`, que o `index.html` referenciava sem o arquivo existir, foi corrigido nesta rodada — mas fica registrado aqui como exemplo do tipo de problema que motivou a checagem "nenhum outro asset referenciado sem existir" feita durante essa correção.
