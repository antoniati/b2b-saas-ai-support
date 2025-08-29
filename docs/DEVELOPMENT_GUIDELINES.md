# Padrões de Desenvolvimento - B2B SaaS AI Support

## Estrutura do Projeto
- `features/` → funcionalidades principais (cada feature isolada)
- `shared/` → hooks, types, utils, libs reutilizáveis
- `app/` → páginas e rotas do Next.js
- `docs/` → documentação interna do time
- `prisma/` → schema e migrations do banco

## Hooks e Utils
- Hooks devem usar `'use client'` quando forem client-side.
- Padrões principais:
  - `useApiQuery` → queries de API
  - `useFormMessages` / `useFormSubmitQuery` → formulários
  - `apiClient` → comunicação com backend
- Sempre retornar `ActionResponse<T>` das chamadas API.

## Tipos
- `ActionResponse<T>` como padrão para todas respostas de API.
- Evite `any`; prefira `unknown` ou tipos específicos.

## Code Style
- ESLint + Prettier configurados.
- Scripts úteis:
  - `pnpm run lint` → verifica ESLint
  - `pnpm run format:check` → verifica Prettier
  - `pnpm run format:fix` → corrige formatação
- Sempre rodar antes de commitar.

## Dev Workflow
- Desenvolver em branches `feature/*` ou `fix/*`.
- Pull Requests para `develop`.
- Revisão de PRs feita por pelo menos 1 outro dev.
- Mantemos branch `main` protegida.

## Commit
- Seguir Conventional Commits:
- Exemplos:
  - `feat(auth): adiciona login de usuário`
  - `fix(ci): ajusta workflow do GitHub Actions`
  - `chore: atualizar dependências`