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

## 📌 Episódio: perda dos assets do CDN `horizons-cdn.hostinger.com`

**Detectado:** rodada 2, ao procurar o logo oficial para gerar o favicon — não fazia parte do briefing daquela rodada, foi um achado incidental.

**O que aconteceu:** todas as imagens do projeto hospedadas em `https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/...` (logo do cabeçalho, foto da diretoria, fotos de sedes, logos de parceiros, imagem do documento de homologação, galeria e logos do Complexo Eco) estavam retornando **404 "NoSuchKey" direto na origem do CDN** — o bucket de onde essas imagens vinham foi apagado ou ficou inacessível em algum momento não determinado. Ainda apareciam no site graças a cache de borda (`cache-control: public, max-age=604800`, até 7 dias), que foi expirando de forma imprevisível página a página.

**Resgate (rodada 3):** rodado um script de download (`tools/rescue-assets.js`) contra as 77 URLs externas únicas do projeto (60 do horizons-cdn + 17 do Unsplash), com retry e sem cache local. Resultado: **as 60 URLs do horizons-cdn — 100% delas — já estavam irrecuperáveis por download direto**, nenhuma bateu em cache de borda durante as tentativas. Só os 8 Unsplash bem-formados foram salvos (ver `ASSET-RESCUE-REPORT.md` para a lista URL-a-URL). Isso significa que o cache que ainda sustentava essas imagens no site ao vivo já tinha esgotado, ou estava prestes a esgotar, no momento do resgate — a corrida contra o prazo de 7 dias foi perdida para o horizons-cdn especificamente.

**O que foi feito imediatamente:** todas as 91 ocorrências no código (`tools/repoint-assets.js`) foram repontadas para caminhos locais — nenhuma referência a domínio externo de imagem restou no projeto. Logo do cabeçalho e o logo "SECABC" do rodapé do Complexo Eco foram apontados para `public/images/Logo_secabc.png` (o brasão real, já usado para o favicon, não um placeholder genérico). Os slots sem arquivo real recebido (praticamente tudo que vinha do horizons-cdn) ficam com `public/images/placeholder.svg` — a marca da entidade, não um ícone de imagem quebrada — até o arquivo correto chegar.

## 🔒 Regra permanente

**Nenhum asset do site (logo, foto institucional, documento) pode depender de CDN de terceiro.** Todo asset usado pelo site vive versionado em `public/images/` dentro do próprio repositório. A causa raiz deste episódio foi exatamente o oposto disso — dependência de um serviço externo (`horizons-cdn.hostinger.com`, do construtor "Hostinger Horizons" que originou o projeto) fora do controle do time que mantém o site hoje.

Isso vale para qualquer imagem nova adicionada dali para frente: baixar e commitar em `public/images/`, nunca linkar direto a um CDN, serviço de terceiro ou banco de imagens externo (Unsplash incluso — os 8 arquivos resgatados desta vez também são temporários, ver lista abaixo).

## O que precisa vir do cliente (Fase 3 — pendente, priorizado)

Nada abaixo foi substituído por imagem de banco — cada slot sem arquivo real fica com o placeholder da marca até chegar o arquivo correto.

1. **Prioridade absoluta — Logo oficial em alta resolução.** `public/images/Logo_secabc.png` (225×225, sem alpha) é o que existe hoje e já está em uso no cabeçalho e no favicon — funciona, mas é baixa resolução para qualquer uso maior que ícone. Se existir uma versão vetorial (AI/EPS/SVG) ou um PNG maior, é o pedido mais importante desta lista: sem logo em boa qualidade, a entidade fica com uma marca genérica ou de baixa resolução no próprio site.
2. **Foto da diretoria** (usada na home) — perdida, sem substituto local.
3. **Fotos reais das sedes regionais** (Mauá, São Caetano, São Bernardo, Diadema — hero de cada página + galeria) — perdidas; as de Mauá/São Caetano/São Bernardo já eram fotos genéricas do Unsplash antes disso (pendência antiga, ver abaixo), agora estão como placeholder da marca.
4. **Foto do presidente de São Bernardo** — já estava quebrada antes deste episódio (URL do Unsplash com typo, `539mmy4a`), continua pendente.
5. **Logos dos 33 parceiros** — perdidos. Prioridade menor que os itens acima (não é a marca do SECABC), mas é a página inteira de Parceiros hoje mostrando placeholder repetido.
6. **Imagem do documento de homologação** (usada no botão de download em `/servicos/homologacoes`) — perdida. Sem ela, o botão "Baixar Documento" está quebrado em termos de conteúdo (o link técnico continua funcionando, mas não há imagem pra baixar).
7. **Galeria e logos do Complexo Eco** (EcoBlue, EcoResort, Espaço Eco) — 13 imagens perdidas.

**Antes de pedir tudo isso ao cliente**, vale tentar a Fase 3 de recuperação por outras vias (Wayback Machine, WordPress antigo se ainda estiver nos arquivos da Hostinger, Instagram/Facebook do SECABC) — não executada ainda, é o próximo passo depois do merge, conforme ordem de execução combinada.

## Nota sobre os 8 arquivos Unsplash resgatados

Ficaram salvos em `public/images/unsplash-placeholder/` nesta rodada, na resolução original do Unsplash (sem redimensionar, conforme instruído) — juntos somam **~25MB**, o que é pesado para o peso de página do site. São fotos genéricas de banco, não fotos reais das sedes/pessoas — já estavam sinalizadas no `CLAUDE.md` como placeholder a substituir. Manter local resolve a dependência de CDN externo, mas não resolve o problema de fundo: são imagens erradas para o contexto (não são fotos reais do SECABC) e precisam ser trocadas pelas fotos verdadeiras assim que chegarem, não apenas otimizadas.

## Pendências conhecidas (não é para mexer sem pedido explícito)

- Fotos genéricas nas páginas de sede — antes eram links do Unsplash (`SedeRegional.jsx`), pendente desde antes desta correção e documentado no `CLAUDE.md`; após a rodada 3, viraram arquivos locais em `public/images/unsplash-placeholder/` (Mauá/São Caetano/São Bernardo) ou o placeholder da marca (Diadema, presidente de São Bernardo — essa era a URL com typo `539mmy4a`, agora corretamente com o placeholder em vez de uma URL quebrada). Continuam sendo fotos erradas para o contexto, só pararam de depender de serviço externo — seguem precisando das fotos reais.
- O mesmo problema de captura de scroll no mapa incorporado do Google Maps existe em `/beneficios/centro-de-lazer` (Complexo Eco) — só o mapa de `/contato` foi corrigido, porque era o único citado no briefing da rodada 1.
- `src/components/ui/sonner.jsx` referencia os pacotes `next-themes` e `sonner`, que não estão instalados — gera erro de lint pré-existente, não usado em nenhuma página ativa do projeto.
- A paleta de cores dos tokens Tailwind atuais (`primary #134C8A`, `accent #F6A52A`) diverge da paleta usada nas peças de rede social e no briefing do projeto de blog (`#14325D`, `#F9C31F`) — decisão de marca a ser tomada pelo cliente, não uma correção de código.
- `public/favicon.svg`, que o `index.html` referenciava sem o arquivo existir, foi corrigido nesta rodada — mas fica registrado aqui como exemplo do tipo de problema que motivou a checagem "nenhum outro asset referenciado sem existir" feita durante essa correção.
