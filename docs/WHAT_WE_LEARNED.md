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

## 🛠 Capítulo 10 — Corrigindo CI, Testes e Security Scan

**O que foi feito**

- Ajustes no workflow do GitHub Actions (ci.yml) para que:
  - pnpm test funcione corretamente com Jest em TypeScript.

  - Coverage e testes de integração com Postgres rodem sem falhas.

  - Security Scan e Build não quebrem o pipeline.

- Correção de comandos no package.json:
  - Substituição de jest --testPathPatterns=".\*\.test\.ts$" para suportar .spec.ts.

  - Inclusão de --passWithNoTests quando necessário para evitar falhas falsas.

- Testes locais rodando 100%:
  - Unitários, integração, e cobertura (coverage) confirmadas.

  - Push e PR para o GitHub garantindo que todos os checks obrigatórios passassem antes de iniciar novas features.

**Erros e soluções**

- Erros de “No tests found” → ajustados paths e regex do Jest.

- Workflow do GitHub Actions falhando → alinhado comandos de teste e instalação de dependências.

Security Scan travando PR → re-executado após ajustes de dependências.

**📌 Aprendizado**

É normal encontrar inconsistências entre ambiente local e CI/CD.

Workflow de testes deve ser robusto e idempotente antes de qualquer merge.

Documentar problemas e soluções fortalece conhecimento do time e facilita debugging futuro.

**💡 O que isso demonstra**

- Capacidade de diagnosticar e corrigir pipelines quebrados.

- Disciplina em garantir que todas as etapas do CI/CD passem antes de continuar desenvolvimento.

- Mentalidade de engenharia profissional: sempre resolver problemas de infraestrutura antes de implementar novas features.

## 🎫 Capítulo 11 — Tickets CRUD e Domain-Driven Design

**O que foi feito**

- Criação do domínio Ticket com tipagem estática forte (ticket.types.ts).

- Validação robusta com Zod (ticket.schemas.ts) para entrada e saída de dados.

- Implementação da camada Repository com filtros automáticos de tenant_id via RLS.

- Criação da camada Service com regras de negócio, como mudança de status e atribuição de responsável.

 - Construção da camada Action para orquestrar fluxo entre front e backend.

- Escrita de testes unitários cobrindo repository e server actions.
  
- Configuração de fixtures e setup unificado para simular múltiplos tenants durante os testes.

- TODO: Implementação da API (/api/tickets) com handlers padronizados e tipados.

**Erros e soluções**

- O schema TicketResponseSchema continha um erro de sintaxe "bobo", que foi solucionado alterando a letra inicial do tenantId para mínuscula. 

- O Postgres não conseguia subir porque a porta 5432 já está em uso no seu sistema host. Foi solucionado liberando a porta 
  
  * soluções possíveis: 
    
    * mudar a porta do container (ex: `ports: - "5433:5432"`)
    
    * remover `ports:` e usar rede interna do Docker (não expor a porta para o host: `DATABASE_URL="postgres://postgres:postgres@saas_postgres:5432/saasdb`)
    
    * desativar postgres na máquina local: `sudo systemctl disable --now- postgresql`

**📌 Aprendizado**

- Criar uma feature complexa do zero exige domínio do fluxo completo (types → schemas → repos → services → actions → endpoints → tests).

- Response DTOs são essenciais para desacoplar banco e API pública, evitando vazamento de dados sensíveis e acoplamento à ORM.

- Isolamento multi-tenant deve ser garantido em todas as camadas — do banco até o middleware e os testes.

- A porta 5432 é padrão do Postgres,ao instalar o postgre diretamente no sistema (fora do Docker) o serviço inicia automaticamente quando ligamos o computador.
  
**💡 O que isso demonstra**

- Consistência na aplicação de padrões de desenvolvimento e arquitetura de software.

- Capacidade de identificar e resolver problemas de infraestrutura e inicialização de containers de forma eficiente.

- Habilidade em propor múltiplas soluções técnicas e tomar decisões fundamentadas de maneira profissional.

- Competência em estruturar features complexas com foco em segurança, testabilidade e escalabilidade.

- Mentalidade orientada a boas práticas e engenharia de software de nível sênior.
  
### 🏆 Impacto Profissional

- **Tech Lead Mindset** → estruturar projeto, CI/CD, automação e boas práticas.

- **Engenharia de Segurança** → multi-tenant, RLS e middleware.

- **Produtividade em Escala** → Plop.js, templates e geração de código.

- **Práticas Profissionais** → commits, PRs, branch protection, code review.

- **Visão de Carreira** → experiência prática em arquitetura SaaS de nível sênior.
