# 📑 Changelog

Todas as mudanças notáveis neste projeto serão documentadas aqui.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [Unreleased]

### Added

- **CRUD completo de Tickets** com suporte a:
  - Criação, listagem, busca por ID e atualização de status.
  - Adição de **respostas** (mensagens) vinculadas ao ticket.
- **Row-Level Security (RLS)** aplicada nos tickets por `tenantId` e `userId`.
- **Validação de acesso**:
  - `UnauthorizedError` quando o contexto do tenant não existe.
  - `ForbiddenError` quando o usuário tenta acessar tickets de outro tenant.
- **Testes unitários e integração** cobrindo todos os métodos do `TicketsRepository`.
- **Utilitário `getPrismaClient`** para simplificar a importação do Prisma Client.

### Changed

- Refatoração de tipos e schemas do Zod para arquivo dedicado (`tickets-types.ts`).
- Ajustes nos mocks de testes para refletir a estrutura completa do ticket e respostas.

---

## [0.2.0] - 10-09-2025

### Added

- **Multi-Tenant Authentication** com NextAuth.js e Prisma.

- **Middleware de contexto** utilizando `AsyncLocalStorage`.

- **Row-Level Security (RLS)** configurado no PostgreSQL.

- **Testes** unitários e de integração com Jest.

- **Plop.js** para geração de templates (Actions, Services, Repositories, APIs, Hooks, Tests).

- **Docker**: `Dockerfile`, `docker-compose.yml` e `.dockerignore`.

### Changed

- Reorganização das pastas de testes (`test-setup`, `setup-database`, `setup-schema`, etc).

- Padronização de nomes de arquivos (`hífen` em vez de `ponto`).

- Camadas bem definidas: Repository → Service → Action → API.

### Fixed

- Ajustes nos workflows do **GitHub Actions** (jobs quebrados no CI).

- Correções de lint em TypeScript (`no-explicit-any`, `no-empty-object-type`, arquivos vazios).

- Ajustes adicionais nos workflows do GitHub Actions:
  - Comandos de testes (`pnpm test`) corrigidos para suportar Jest com `.spec.ts`.
  - Coverage e testes de integração com Postgres rodando sem falhas.
  - Security Scan e Build corrigidos para não travar PRs.
- Garantia de que todos os checks obrigatórios do CI/CD passam antes de merges.

---

## [0.1.0] - 22-09-2025

### Added

- Setup inicial com **Next.js 15, TypeScript, TailwindCSS**.

- Configuração de **ESLint, Prettier e scripts de automação**.

- Estrutura inicial com **layout global** (Header, Footer, MainContainer).
