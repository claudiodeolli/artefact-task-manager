# Sessão 2026-11-13 (natan-oliveira, 0da4e012)

**Pedido:** redesign visual sem mudar funcionalidades; depois loading states e ajustes.

**O que mudou e por quê:**
- Redesign a partir de 3 imagens (pastel bento), refeito a pedido: sem menu lateral, cards iguais empilhados, só estética das referências.
- Trocado pela estética do site artefact.com/br (IBM Plex, azul-marinho, magenta, degradês, botões pílula, cards retos), extraída do CSS real do site.
- Rodapé removido a pedido do usuário.
- Estados de loading em toda a navegação e nas ações; skeleton da lista movido para o grupo `(task-list)` para não aparecer antes do skeleton do formulário.
- Um `next build` rodado durante o dev server do usuário quebrou a porta 3000 (ver 03 Conhecimento); resolvido pelo usuário recriando `.next`.

**Pendente:** commit bloqueado pelo hook (repo fora do GitHub da organização); vulnerabilidade do PostCSS via Next 15 exige migrar para Next 16 (decisão do usuário).
- Layout shift entre skeleton e página eliminado: removida a animação de entrada do conteúdo e skeletons reconstruídos sobre a estrutura real (introduções extraídas em componentes compartilhados).
- QA completo (API, E2E, carga, acessibilidade, responsivo, segurança): corrigidos feedback persistente no F5, lista com dado velho após salvar, exclusões em paralelo, mensagens de erro técnicas/vazando detalhes, ausência de proteção contra clickjacking. Ver 01 Decisões/2026-11-13 correções de QA.md.
