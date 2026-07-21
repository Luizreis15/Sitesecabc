# IMAGENS — Página /links (v2)

Checklist das imagens esperadas pela página `/links` (`src/pages/Links.jsx`).
Todos os arquivos abaixo já existem como **placeholders visuais** (fundo azul-escuro
com o nome do arquivo escrito no centro) em `public/images/`. Basta substituir cada
arquivo pelo definitivo, **mantendo exatamente o mesmo caminho e nome**.

| # | Caminho exato | Dimensão recomendada | Onde aparece |
|---|---|---|---|
| 1 | `public/images/logo/logo.png` | 512×512px, **PNG transparente** | Hero — logo dentro do badge circular com borda dourada |
| 2 | `public/images/banners/banner-01.jpg` | 1920×800px (ou 16:9, `object-cover` ajusta) | Carrossel "Destaques" — slide 1 (carrega eager, sem lazy) |
| 3 | `public/images/banners/banner-02.jpg` | 1920×800px | Carrossel "Destaques" — slide 2 |
| 4 | `public/images/banners/banner-03.jpg` | 1920×800px | Carrossel "Destaques" — slide 3 |
| 5 | `public/images/banners/banner-04.jpg` | 1920×800px | Carrossel "Destaques" — slide 4 |
| 6 | `public/images/banners/banner-05.jpg` | 1920×800px | Carrossel "Destaques" — slide 5 |
| 7 | `public/images/presidente/presidente-01.jpg` | 800×1000px (retrato vertical 4:5) | Seção institucional — foto do presidente Ademar Gonçalves |
| 8 | `public/images/og-cover.jpg` | 1200×630px | `index.html` — `og:image` / `twitter:image` (preview ao compartilhar o link) |

## Sobre a pasta `/hero`

A pasta `public/images/hero/` foi criada mas está **vazia de propósito**: o fundo do
Hero (gradiente azul + arcos/linhas douradas) é gerado 100% em CSS/SVG no próprio
componente, sem depender de nenhum arquivo de imagem. Isso mantém o Hero leve
(bom para Lighthouse) e sem foto de grupo, como pedido. Se no futuro você quiser
uma imagem de fundo real ali, é só avisar que eu adapto o componente.

## Editando os banners e o link de cada slide

O array `BANNERS` está no topo de `src/pages/Links.jsx` — cada item tem `img`,
`href` e `alt`. Troque o `href` de cada slide se quiser apontar para outro
destino quando o usuário tocar no banner.

## Observação sobre o WhatsApp

Os links de WhatsApp da página usam o número `5511933194304` (com código do país
`55`, formato exigido pelo `wa.me`). Reparei que o cabeçalho/rodapé do site
principal (`MainLayout.jsx`) e o botão flutuante usam `wa.me/11933194304`, **sem
o `55`** — isso pode estar quebrando esses links hoje. Não mexi neles porque
estão fora do escopo deste ajuste, mas vale corrigir se você confirmar.

## Observação sobre o `og:image`/título estáticos

O `<title>` e as tags OG foram colocados diretamente no `index.html` (fora do
React), conforme pedido, para funcionar com crawlers que não executam JS
(WhatsApp, Facebook etc.). Como o site é uma SPA com um único `index.html`,
esse título/descrição/imagem estático valem, hoje, como preview padrão para
**qualquer URL do site** compartilhado (não só `/links`) — as demais páginas
continuam trocando o `<title>` via JS (`react-helmet`) depois que a página
carrega, mas isso não é visto por bots de preview. Se quiser um preview
diferente para a Home e outras páginas, é preciso um passo extra de
pré-renderização (SSR/prerender) — me avise se quiser que eu configure isso.
