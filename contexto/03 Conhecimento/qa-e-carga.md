# QA e carga — referência (2026-11-13)

Medido num build de produção isolado (Windows, máquina local):
- 1000 criações simultâneas (100 de concorrência): 0 erros, p95 ~190 ms.
- Listagem com ~10 mil tarefas: p95 ~100 ms; percorrer as 10 mil pelo cursor leva < 1 s.
- SSR de `/`: ~180–200 req/s, p95 ~125 ms.
- Paginação por cursor consistente mesmo com timestamps empatados e com criação/exclusão no meio da navegação.
- axe WCAG 2.2 AA sem violações em lista, formulário (inclusive com erro) e 404.
Armadilha de teste: o `useMutation` do TanStack só chama os callbacks de `mutate` da última chamada.
