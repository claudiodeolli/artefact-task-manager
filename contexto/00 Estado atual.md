# Estado atual

Gerenciador de tarefas em memória (case técnico Artefact): Next.js 15, tRPC 11, React 19, TypeScript, Vitest. Lista com scroll infinito, criação, edição e exclusão de tarefas.

- Sistema visual vigente: "Artefact Studied" (estética do site artefact.com/br), descrito em `design.md`. Tokens em `src/app/tokens.css`. Sem menu lateral e sem rodapé.
- Página da lista em `src/app/(task-list)/` (grupo de rotas, URL `/`); formulários em `src/app/tasks/`.
- Estados de loading: skeletons por rota (`loading.tsx`), spinner em botões `aria-busy`.
- Testes: `npm test` (130 testes). Build: `npm run build`.
- Alterações da branch `design/bento-pastel-redesign` estão staged, sem commit: o hook da empresa bloqueia commit porque o repo não está no GitHub da organização.
- Cabeçalhos de segurança definidos em `next.config.ts`.
