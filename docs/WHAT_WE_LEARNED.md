# 📖 What We Learned – B2B Support AI Project

Este documento registra a **jornada de aprendizado** durante a construção do projeto **B2B Support AI**.

Cada capítulo reflete desafios reais de engenharia de software, as soluções aplicadas e os ganhos profissionais adquiridos.

---

## 📦 Capítulo 1 — Setup Inicial e Qualidade de Código

**O que foi feito**

- Criação do projeto com PNPM, Next.js 15, TypeScript, TailwindCSS.

- Configuração de ESLint, Prettier, TypeScript e scripts de automação.

- Estrutura inicial com Layout Global (Header, Footer, MainContainer).

**Erros e soluções**

- Erros comuns em lint (`no-explicit-any`, `no-empty-object-type`, arquivos vazios).

- Correções sistemáticas garantindo build limpo desde o início.

**📌 Aprendizado**

- Erros em projetos novos são normais; o importante é criar disciplina para corrigi-los cedo.

- Qualidade desde o dia 1 evita dívida técnica.

---

## ⚡ Capítulo 2 — CI/CD e GitHub Actions

**O que foi feito**

- Configuração de workflow `ci.yml` com jobs: Lint, Type Check, Test, Build e Security Scan.

- Correções em jobs quebrados (`pnpm ci` → `pnpm install --frozen-lockfile`).

- Branch protection + Pull Request reviews.

**📌 Aprendizado**

- Status checks obrigatórios garantem segurança de merges.

- CI/CD é mais do que automação: é cultura de qualidade.

**💡 O que isso demonstra**

- Capacidade de configurar pipelines profissionais.

- Mentalidade de Tech Lead na definição de workflow de time.

---

## 🔐 Capítulo 3 — Autenticação de Usuários e Testes

**O que foi feito**

- Definição clara de camadas: Repository, Service, Action, API, Schema, Types.

- Implementação de autenticação com NextAuth.

- Estrutura inicial de testes unitários e de integração com Jest.

**Erros e soluções**

- Problemas com ESM no Jest → resolvidos via transpile.

- Chamadas reais ao DB bloqueadas com mocks/fixtures.

- Uso de `jest.spyOn` para monitorar comportamentos.

**📌 Aprendizado**

- Testes dão confiança e documentam comportamento de forma viva.

- Divisão de responsabilidades entre camadas evita acoplamento.

---

## 🏢 Capítulo 4 — Multi-Tenant e Segurança por Design

**O que foi feito**

- Middleware de contexto com `AsyncLocalStorage`.

- Identificação automática por subdomínio (`empresa.dominio.com`).

- Refatoração de fluxos para isolamento de tenant.

**📌 Aprendizado**

- Segurança precisa estar no design, não só em patches.

- Isolation patterns são fundamentais em SaaS multi-tenant.

**💡 O que isso demonstra**

- Capacidade de pensar arquitetura além do código.

- Mentalidade de segurança em profundidade.

---

## ⚙️ Capítulo 5 — Produtividade com Plop.js

**O que foi feito**

- Templates para Actions, Services, Repositories, APIs, Hooks, Tests.

- Helpers para padronizar nomenclatura (`pascalCase`, `camelCase`).

- Integração de testes gerados automaticamente.

**📌 Aprendizado**

- Automação = multiplicador de produtividade.

- Consistência arquitetural acelera onboarding de novos devs.

**💡 O que isso demonstra**

- Visão de Tech Lead sobre produtividade de equipe.

- Experiência em criação de dev tools internas.

---

## 🔒 Capítulo 6 — Row-Level Security (RLS)

**O que foi feito**

- Ativação de RLS no Postgres para isolamento de tenants.

- Policies definidas via `app.tenant_id`.

```sql
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON tickets
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

📌 **Aprendizado**

- Segurança em profundidade: mesmo se alguém esquecer where tenant_id, o banco bloqueia.

- Middleware Edge vs Node runtimes: como passar tenantId entre ambientes.

## 🐳 Capítulo 7 — Docker e Testes de Integração

**O que foi feito**

- Instalação e configuração do Docker no ambiente Linux.

- Criação de Dockerfile, docker-compose.yml e .dockerignore.

- Execução de containers para testes de integração com banco.

**Comandos essenciais**

```sh
docker compose up --build -d
docker compose
exec saas_app pnpm exec prisma migrate dev --name init_tables
docker compose down -v
```

📌 **Aprendizado**

- Containers permitem testes realistas sem poluir o ambiente local.

- Reset e isolamento de banco de dados se tornam simples.

## 🗂 Capítulo 8 — Revisão e Refatoração de Estrutura

**O que foi feito**

- Padronização da nomenclatura de arquivos, adotando kebab-case no lugar de dot.case.

- Criação de um setup unificado para testes, incluindo test-setup, setup-database, setup-schema e fixtures.

- Reorganização de pastas para refletir melhor a divisão por features e shared modules, trazendo mais clareza arquitetural.

**📌 Aprendizado**

- Pequenas inconsistências de nomenclatura se tornam grandes gargalos em projetos de médio/longo prazo.

- Um setup de testes centralizado elimina redundância e aumenta a confiabilidade.

Uma estrutura clara de pastas reflete a mentalidade de “software escalável”, facilitando onboarding e manutenção.

**💡 O que isso demonstra**

- Maturidade em aplicar refactors incrementais sem quebrar funcionalidades existentes.

- Visão de Tech Lead ao pensar em legibilidade, padronização e onboarding de time.

- Capacidade de estruturar um projeto para crescer de forma saudável, evitando a temida “arquitetura espaguete”.

## 🎫 Capítulo 9 — Próximos Passos: Tickets CRUD

**O que será feito**

- Definição do domínio Ticket (tipos, schema de validação, relacionamentos).

- Implementação da camada de Repository com RLS aplicado.

- Criação de Services encapsulando regras de negócio (ex.: mudança de status, atribuição de responsável).

- Exposição de Actions e Endpoints API para criação, leitura, atualização e exclusão de tickets.

- Escrita de testes unitários e de integração, garantindo segurança multi-tenant.

**📌 Aprendizado esperado**

- Consolidar o fluxo de desenvolvimento em camadas (types → schemas → repos → services → actions → endpoints).

- Praticar design orientado ao domínio (DDD-lite) dentro de um módulo real.

- Reforçar práticas de isolamento de dados em um caso de uso central do sistema.

**💡 O que isso demonstra**

- Capacidade de evoluir a aplicação SaaS além do “setup inicial”, entregando uma feature completa.

- Pensamento sistêmico: integração entre backend, banco de dados e segurança multi-tenant.

- Maturidade em construir funcionalidades core que sustentam o produto.

### 🏆 Impacto Profissional

- **Tech Lead Mindset** → estruturar projeto, CI/CD, automação e boas práticas.

- **Engenharia de Segurança** → multi-tenant, RLS e middleware.

- **Produtividade em Escala** → Plop.js, templates e geração de código.

- **Práticas Profissionais** → commits, PRs, branch protection, code review.

- **Visão de Carreira** → experiência prática em arquitetura SaaS de nível sênior.
