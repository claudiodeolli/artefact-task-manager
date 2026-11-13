# Estados de loading (2026-11-13)

- Skeleton da lista vive em `app/(task-list)/loading.tsx`, não na raiz de `app/`: um `loading.tsx` na raiz envolve todas as rotas e fazia "New task" mostrar o skeleton da lista antes do skeleton do formulário.
- `app/tasks/loading.tsx` cobre nova tarefa e edição com o skeleton do formulário.
- Após salvar, o botão fica ocupado até a navegação terminar (`useTransition` em volta do `router.push`), evitando envio duplo.
- "Try again" da lista tem estado próprio (`isRetryingTaskListLoading`).
- Sem layout shift: skeletons usam os CSS Modules reais e renderizam de verdade o texto fixo (`TaskListIntro`, `TaskFormIntro`, rótulos, dicas); só dados desconhecidos viram shimmer, com texto invisível no mesmo estilo tipográfico. Medido: diferença 0px em 1440, 1024 e 375.
- Conteúdo não tem mais animação de entrada (ela causava o "pulo" ao trocar skeleton por página). Só o skeleton aparece com fade, atrasado 150 ms.
- Um `loading.tsx` por rota de formulário (`tasks/new`, `tasks/[taskId]/edit`) para o skeleton já mostrar o título correto.
