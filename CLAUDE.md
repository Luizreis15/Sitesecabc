# CLAUDE.md — Projeto SECABC

> Leia este arquivo inteiro antes de tocar em qualquer código.
> Ele contém o histórico, diagnóstico, decisões e padrões do projeto.
> Sempre consulte aqui antes de criar, editar ou deletar qualquer arquivo.

---

## 🏢 O Projeto

**Cliente:** SECABC — Sindicato dos Empregados no Comércio do ABC  
**Site:** secabc.org.br  
**Objetivo:** Site institucional para sindicato da região do Grande ABC (SP)  
**Público:** Trabalhadores do comércio — maioria acessa pelo celular  
**Tom:** Sério, confiável, acessível, direto ao ponto  

---

## 📦 Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React + Vite |
| Estilo | Tailwind CSS |
| Componentes | shadcn/ui |
| Linguagem | JavaScript (JSX) — não TypeScript |
| Animações | Framer Motion |
| Roteamento | React Router DOM v6 |
| Backend/DB | Supabase |
| Auth | Supabase Auth (apenas para área admin) |
| Ícones | Lucide React |
| Notificações | Sonner (toast) |

---

## 🗂️ Estrutura de Arquivos

```
src/
├── components/
│   ├── layout/
│   │   └── MainLayout.jsx       → Header sticky, nav, footer, WhatsApp flutuante
│   ├── sections/
│   │   └── ContactSection.jsx   → Formulário de contato reutilizável
│   └── ui/                      → shadcn (nunca editar diretamente)
├── pages/                       → uma página por rota
│   ├── Home.jsx
│   ├── OSindicato.jsx
│   ├── Beneficio.jsx
│   ├── SedeRegional.jsx
│   ├── SedesRegionais.jsx
│   ├── NoticiaPost.jsx
│   └── ...
├── data/
│   └── noticias.jsx             → dados hardcoded (migrar para Supabase)
├── lib/
│   └── supabase.js              → cliente Supabase
├── App.jsx                      → rotas registradas aqui
└── main.jsx                     → ponto de entrada
public/
└── images/                      → imagens do site (salvar sempre aqui)
```

---

## 🔐 Supabase

### Cliente (src/lib/supabase.js)
```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Variáveis de ambiente (.env.local)
```
VITE_SUPABASE_URL=https://nmtcaoqnrqlkmwgeigns.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```
⚠️ `.env.local` nunca deve ser commitado. Confirmar que está no `.gitignore`.  
⚠️ Nunca expor `SUPABASE_SERVICE_ROLE_KEY` no frontend.

### Tabelas criadas

**contatos** — formulário de contato público
```
id, nome, email, telefone, assunto, mensagem, created_at
RLS: insert aberto | select apenas autenticados
```

**noticias** — gestão de notícias via painel Supabase (a implementar)
```
id, titulo, slug, resumo, conteudo, imagem_url, publicado (boolean), created_at
RLS: select público apenas onde publicado = true | CRUD apenas autenticados
```

---

## 🎨 Cores e Design

### Paleta oficial SECABC
```
Azul institucional:  #134C8A  → token: primary
Amarelo:             #F6A52A  → token: accent
Amarelo claro:       #FFE47F  → token: highlight
Verde:               #22C45E  → token: success
```

⚠️ Nunca usar cores hex diretamente no JSX. Sempre usar os tokens Tailwind acima.

### Fontes
- `font-sans` → Inter (corpo)
- `font-heading` → Montserrat (títulos)
- Mobile-first sempre: escrever estilos para 375px e expandir com `sm:` `md:` `lg:`

---

## 📋 Diagnóstico — Problemas Conhecidos

> Consulte esta seção antes de qualquer tarefa para entender o estado atual.

### ✅ Críticos (já corrigidos)

- **Dois popups disparando juntos na Home** — `PopupBanner.jsx` e `PopupModal.jsx` deletados. Apenas `SimplePopup` permanece na Home.
- **Links quebrados** — `/osindicato` corrigido para `/o-sindicato`; rota `OSindicato` registrada no `App.jsx`; `<Navigate to="/404">` corrigido para `<Navigate to="/" />`.
- **ScrollToTop não funcionava** — `ScrollToTop` registrado no `main.jsx`.
- **Botão duplicado "Painel do Contribuinte"** — removido da nav bar mobile; permanece no top bar (sm+) e no drawer.
- **Integração Supabase no formulário de contato** — `ContactSection.jsx` faz insert real na tabela `contatos`.
- **Cores hardcoded** — migradas para tokens Tailwind em `MainLayout.jsx` e `ContactSection.jsx`.
- **Componentes lixo do Horizons deletados** — `CallToAction.jsx`, `HeroImage.jsx`, `WelcomeMessage.jsx`, `WelcomePopup.jsx`, `HomePage.jsx`.
- **Hero estático** — substituído por carousel de 3 slides com autoplay (5s, loop). Imagens em `public/images/banners/`.
- **Botão "Homologar Online"** — adicionado no top bar e no drawer mobile, link `https://www.veramo.com.br/login`.

### 🟡 Médios (pendentes)

**Imagens a substituir**
| Arquivo | Linha | Problema | Salvar em |
|---|---|---|---|
| `SedeRegional.jsx` | 19–21 | Foto Unsplash genérica repetida 3x — Mauá | `public/images/sedes/maua-1.jpg` etc. |
| `SedeRegional.jsx` | 38–40 | Foto Unsplash genérica repetida 3x — São Caetano | `public/images/sedes/sao-caetano-1.jpg` etc. |
| `SedeRegional.jsx` | 56–58 | Foto Unsplash genérica repetida 3x — São Bernardo | `public/images/sedes/sao-bernardo-1.jpg` etc. |
| `SedeRegional.jsx` | 63 | URL com typo `539mmy4a` — foto presidente SBC quebrada | `public/images/presidentes/sao-bernardo-presidente.jpg` |
| `Home.jsx` | 21–23 | Banners do carousel aguardando imagens reais | `public/images/banners/banner-1.jpg` etc. |

**Notícias desatualizadas**
- 9 notícias hardcoded em `src/data/noticias.jsx` — todas de out/nov 2025
- Nenhuma é sobre o SECABC — são notícias genéricas do ABC
- Curto prazo: esvaziar o array e exibir estado "em breve"
- Médio prazo: buscar da tabela `noticias` no Supabase

### 🟠 Baixa prioridade (pendentes)

- Páginas incompletas: `/servicos/carteirinha`, `/servicos/homologacoes` (form), `/servicos/atualizar-cadastro`
- `Beneficio.jsx` — convenios, kit-escolar, colonias-de-ferias com descrição "em construção"
- `OSindicato.jsx` — fotos genéricas do Unsplash para Presidente e Diretoria
- Seção de redes sociais na Home — placeholder "em breve"
- Responsividade mobile — Header corrigido; demais seções pendentes
- Formulário de contato não envia e-mail — apenas salva no Supabase

---

## 🗺️ Rotas Registradas (App.jsx)

```
/                            → Home.jsx
/o-sindicato                 → OSindicato.jsx
/o-sindicato/:slug           → OSindicato.jsx
/sedes-regionais             → SedesRegionais.jsx
/sedes-regionais/:slug       → SedeRegional.jsx
/beneficios                  → Beneficios.jsx
/beneficios/:slug            → Beneficio.jsx
/servicos                    → Servicos.jsx
/servicos/homologacoes       → Homologacoes.jsx
/servicos/:slug              → Servico.jsx
/parceiros                   → Parceiros.jsx
/noticias                    → Noticias.jsx
/noticias/:slug              → NoticiaPost.jsx
/contato                     → Contato.jsx
/politica-de-privacidade     → PoliticaPrivacidade.jsx
/lgpd                        → LGPD.jsx
*                            → NotFound.jsx
```

---

## 🖼️ Imagens — Regras

- **Sempre salvar em** `public/images/`
- **Nomenclatura:** `kebab-case`, sem espaços, sem acentos → `sede-sao-bernardo.jpg`
- **Referenciar como:** `/images/nome.jpg` (URL absoluta a partir do public)
- **Nunca usar** URLs do Unsplash para imagens reais do cliente
- **Tamanhos recomendados:**
  - Hero/Banner: 1920×600px, máx 300kb
  - Fotos de sedes (galeria quadrada): 800×800px, máx 150kb
  - Fotos de pessoas (presidente): 400×400px, máx 100kb
  - Thumbnails de notícias: 600×400px, máx 100kb

---

## ⚡ Padrão para Formulários

```jsx
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export function MeuForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const form = e.target
    const dados = {
      campo: form.campo.value,
    }

    const { error } = await supabase.from('tabela').insert(dados)

    if (error) {
      toast({ title: 'Erro ao enviar.', description: 'Tente novamente.', variant: 'destructive' })
    } else {
      toast({ title: 'Enviado com sucesso!' })
      form.reset()
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* campos */}
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}
```

---

## 🚫 O Que Nunca Fazer

- Nunca editar arquivos dentro de `src/components/ui/` — são do shadcn
- Nunca commitar `.env.local`
- Nunca usar URLs do Unsplash para imagens reais do cliente
- Nunca adicionar cores hex hardcoded no JSX — usar tokens Tailwind
- Nunca criar nova rota sem registrar no `App.jsx`
- Nunca criar novo popup sem verificar se já existe um ativo (`SimplePopup` na Home)
- Nunca usar `<a href>` para links internos — sempre `<Link to>` do react-router
- Nunca expor `SUPABASE_SERVICE_ROLE_KEY` no frontend
- Nunca adicionar overlay escuro (`bg-black/*`, `bg-blue-900/*`, `opacity`) sobre banners e imagens que já têm texto embutido no próprio arquivo. Overlays só fazem sentido quando há texto gerado por código sobreposto à imagem. Exemplo: `Home.jsx` linha 86 tinha `bg-black/50` cobrindo todo o carousel — removido em 14/05/2026.

---

## ✅ Ordem de Trabalho Recomendada

1. **Correções críticas** — popups, links quebrados, ScrollToTop ✅
2. **Integração Supabase** — formulário de contato funcionando ✅
3. **Padronização de cores** — migrar hardcoded para tokens ✅
4. **Responsividade mobile** — seção por seção, começar pelo Header ✅ (Header feito)
5. **Imagens reais** — substituir Unsplash/placeholders por fotos do cliente ⏳
6. **Notícias** — esvaziar hardcoded, buscar do Supabase ⏳
7. **Páginas incompletas** — carteirinha, homologações, redes sociais ⏳
8. **Responsividade mobile** — continuar nas demais seções da Home ⏳

---

## 💬 Como Trabalhar Neste Projeto

- **Sempre uma etapa por vez** — não fazer múltiplas mudanças de uma vez
- **Mostrar diff antes de salvar** — especialmente em arquivos críticos como `App.jsx` e `MainLayout.jsx`
- **Confirmar com o usuário** antes de deletar qualquer arquivo
- **Testar em 375px** toda alteração de layout antes de considerar pronta
- **Não inventar conteúdo** — textos, nomes, dados do sindicato devem vir do usuário
