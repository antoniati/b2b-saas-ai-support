# 📑 Changelog

Todas as mudanças notáveis neste projeto serão documentadas aqui.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [Unreleased]

### Em andamento

- CRUD de Tickets com validação, testes unitários e de integração.

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

---

## [0.1.0] - 22-09-2025

### Added

- Setup inicial com **Next.js 15, TypeScript, TailwindCSS**.

- Configuração de **ESLint, Prettier e scripts de automação**.

- Estrutura inicial com **layout global** (Header, Footer, MainContainer).
