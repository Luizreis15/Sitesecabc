# SECABC — Site institucional

Site institucional do SECABC (Sindicato dos Comerciários do ABC). React + Vite, deploy na Vercel.

## Rodando localmente

```bash
npm install
npm run dev
```

Crie um `.env.local` na raiz com:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Fluxo de deploy

O projeto está conectado ao GitHub (`Luizreis15/Sitesecabc`) via integração Git da Vercel. `main` é produção — todo merge nela dispara deploy automático em produção.

Fluxo para qualquer alteração:

1. Criar uma branch a partir de `main` (ex.: `fix/nome-da-correcao`, `feat/nome-da-feature`).
2. Dar push da branch. A Vercel gera automaticamente um **deploy de preview** para ela.
3. Abrir um Pull Request no GitHub apontando para `main`. O bot da Vercel comenta o PR com o link do preview.
4. Revisar as mudanças no preview (URL única, com o site completo funcionando, incluindo Supabase — as variáveis de ambiente também estão configuradas para o ambiente Preview).
5. Aprovar e fazer merge do PR em `main`. O merge dispara o deploy de produção.

Nunca commitar direto em `main`.

## Variáveis de ambiente na Vercel

`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão configuradas nos ambientes **Production** e **Preview** do projeto na Vercel (`vercel env ls` para conferir). Sem isso, os deploys de preview sobem com o formulário de contato quebrado.
