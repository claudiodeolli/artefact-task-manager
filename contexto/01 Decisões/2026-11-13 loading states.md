# Estados de loading (2026-11-13)

- Skeleton da lista vive em `app/(task-list)/loading.tsx`, não na raiz de `app/`: um `loading.tsx` na raiz envolve todas as rotas e fazia "New task" mostrar o skeleton da lista antes do skeleton do formulário.
- `app/tasks/loading.tsx` cobre nova tarefa e edição com o skeleton do formulário.
- Após salvar, o botão fica ocupado até a navegação terminar (`useTransition` em volta do `router.push`), evitando envio duplo.
- "Try again" da lista tem estado próprio (`isRetryingTaskListLoading`).
