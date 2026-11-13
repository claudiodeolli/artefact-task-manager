# Correções da rodada de QA (2026-11-13)

- Mensagem de feedback ("Entry added…") não volta no F5: `useStatusQueryParameterCleanup` remove `?status=` da URL com `history.replaceState` depois de ler.
- Lista não mostra dado velho após criar/editar: as mutations de create/update fazem `removeQueries` em vez de `invalidateQueries`, então a lista usa a página fresca vinda do servidor. (Com invalidate, a query inativa só era marcada como velha e aparecia por ~30 ms com a contagem antiga.)
- Exclusões em paralelo: `deletingTaskIds` é um `Set` e cada exclusão usa `mutateAsync` (o `mutate` do TanStack só dispara callbacks da última chamada). Clique repetido na mesma tarefa é ignorado.
- Mensagens de erro: rede → "Could not reach the server…"; NOT_FOUND → "This entry no longer exists…" (sem expor o id); INTERNAL_SERVER_ERROR → mensagem genérica. No servidor, o errorFormatter troca a mensagem e remove o `stack` de erros internos.
- Cabeçalhos de segurança em `next.config.ts` (X-Frame-Options DENY, CSP frame-ancestors 'none', nosniff, Referrer-Policy, Permissions-Policy): o app tem exclusão com um clique e podia ser embutido em iframe (clickjacking).
- Páginas de formulário com `robots: noindex`. Limitação aceita: URL de edição de tarefa inexistente mostra a tela de 404 mas responde HTTP 200, porque o `loading.tsx` faz streaming antes do `notFound()`. Corrigir exigiria remover o skeleton da edição.
