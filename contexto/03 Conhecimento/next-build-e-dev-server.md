# next build x next dev na mesma pasta

Rodar `next build` enquanto o `next dev` do usuário está ligado sobrescreve a pasta `.next` compartilhada e o dev server passa a responder 500. Para testar build de produção, usar uma cópia do projeto fora do repo (com junction para `node_modules`) ou parar o dev server antes. Se acontecer: parar o dev server, apagar `.next` e rodar `npm run dev`.
