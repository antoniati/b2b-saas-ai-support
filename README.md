# 🚀 B2B SaaS AI Support Platform

Uma plataforma moderna de suporte ao cliente com Inteligência Artificial, projetada para empresas (B2B) com suporte multi-tenant e sistema de billing integrado.

> Nota: Este é um projeto de estudo criado para aprender e simular o trabalho em equipe de desenvolvimento, seguindo práticas profissionais e fluxos de trabalho colaborativos.

---

## ⚡ Funcionalidades

### 🎯 MVP (Minimum Viable Product)

- ✅ **Sistema Multi-Tenant -** Suporte a múltiplas empresas

- ✅ **Autenticação Segura -** NextAuth com adaptador Prisma

- ✅ **Dashboard Administrativo -** Visualização de métricas e tickets

- ✅ **Sistema de Tickets -** Gestão completa de suporte ao cliente

- ✅ **IA Integrada -** Respostas automáticas com OpenAI GPT-4

- ✅ **Sistema de Billing -** Integração com Stripe para pagamentos

- ✅ **Email Transactions -** Comunicação via Resend

---

## 🛠️ Tecnologias

- **Framework**: Next.js 15.5.0 com App Router

- **Banco de Dados**: PostgreSQL com Prisma ORM

- **Autenticação**: NextAuth.js com adaptador Prisma

- **Estilização**: Tailwind CSS 4.0

- **IA**: OpenAI API (GPT-4)

- **Pagamentos**: Stripe Integration

- **Email**: Resend

- **UI Components**: Radix UI + Custom Components

- **Type Safety**: TypeScript

- **Testing**: Jest e Testing Library

- **Code Quality**: ESLint + Prettier

- **Deployment**: Ready for Vercel

---

## 🤝 Como Começar

### Pré-requisitos

- Node.js 20+

- PostgreSQL

- Conta OpenAI (para features de IA)

- Conta Stripe (para pagamentos)

- Conta Resend (para emails)

**Este é um projeto de estudo, mas seguimos práticas profissionais:**

1. **Siga o fluxo de branches** - Crie branches feature-specific

2. **Escreva testes** - Mantenha a cobertura de testes

3. **Documente mudanças** - Use conventional commits

4. **Revise código** - Simule code reviews mesmo trabalhando solo

5. **Mantenha a qualidade** - Siga as regras de ESLint e Prettier

---

### 📥 Instalação

1. Clonar repositório:

```bash
git clone <[URL_DO_REPO](https://github.com/antoniati/b2b-saas-ai-support)>
cd b2b-saas-ai-support
```

2. Instalar dependências:

```bash
npm install
```

3. Configure as váriaveis de ambiente no `.env`:

```env
cp .env.example .env
```

4. Configure o banco de dados:

```bash
npx prisma generate
npx prisma db push
```

5. Execute o projeto:

```bash
npm run dev
```

6. Acessar:

```
http://localhost:3000
http://localhost:3000/api/health
```

---

## 📝 Commits e Branches

Estrutura de Branches:

- `main` → branch estável

- `develop` → branch de integração

- `feature/*` → branches de funcionalidades

- `hotfix/*` → correções emergenciais

Seguimos Conventional Commits:

- `feat`: Nova funcionalidade

- `fix`: Correção de bug

- `docs`: Documentação

- `style`: Mudanças de formatação

- `refactor`: Refatoração de código

- `test`: Adição ou correção de testes

- `chore`: Mudanças em scripts de build ou ferramentas

---

| Etapa | Feature                               | Descrição                                                         | Responsável       | Status       |
| ----- | ------------------------------------- | ----------------------------------------------------------------- | ----------------- | ------------ |
| ✅ 1  | **Autenticação Multi-Tenant**         | NextAuth.js + middleware + RLS para isolar dados por empresa      | Dev A + Tech Lead | Concluído    |
| ✅ 2  | **CRUD de Tickets**                   | Criar, listar, atualizar e deletar tickets com validação + testes | Dev A (backend)   | Concluído    |
| 🟡 3  | **HomePage**                          | Homepage moderna, SEO, CTA e links para página de autenticação    | Dev B (frontend)  | Em Andamento |
| ⚪ 4  | **Login, Register, Recover, Reset**   | Páginas para autenticação integradas ao NextAuth                  | Dev B (frontend)  | Pendente     |
| ⚪ 5  | **IA para Respostas Automáticas**     | OpenAI GPT-4 + RAG para FAQ e respostas inteligentes              | Dev A + Dev B     | Pendente     |
| ⚪ 6  | **Dashboard de Métricas e Analytics** | Visualizar métricas de tickets, suporte e faturamento             | Dev B (frontend)  | Pendente     |
| ⚪ 7  | **Integração Stripe (Planos SaaS)**   | Checkout, webhooks e histórico de pagamentos                      | Dev A + Tech Lead | Pendente     |

</div>

### 📝 Dicas

- Use **branches feature/** para cada etapa.

- Mantenha **commits claros e pequenos**.

- Atualize o **README ou Docs** à medida que cada etapa é concluída.

- Utilize o **CI/CD** configurado para garantir qualidade e consistência do código.

<div align="center">
🚀 Este roadmap ajuda o time a visualizar progresso e dependências, garantindo um desenvolvimento organizado e profissional!
</div>

---

## 📖 Documentação

- [Estrutura do Projeto](./docs/PROJECT_STRUCTURE.md)

- [Padrões de Desenvolvimento](./docs/DEVELOPMENT_GUIDELINES.md)

- [Branch Strategy](./docs/BRANCH_STRATEGY.md)

- [CI/CD Guide](./docs/CI_CD_GUIDE.md)

- [Commit Messages](./docs/COMMIT_MESSAGES.md)

Para mais detalhes sobre guias técnicos, módulos e padrões estão disponíveis em [./docs/README.md](./docs/README.md).

> Nota: Este projeto simula um ambiente de desenvolvimento profissional para aprendizado das práticas e fluxos de trabalho de equipes de desenvolvimento.

---

<div align="center"> <br> <strong>Desenvolvido com ❤️ para aprendizado em engenharia e desenvolvimento de software profissional</strong> </div>
