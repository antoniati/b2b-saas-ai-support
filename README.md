# 🚀 B2B SaaS AI Support Platform

Uma plataforma moderna de suporte ao cliente com Inteligência Artificial, projetada para empresas (B2B) com suporte multi-tenant e sistema de billing integrado.

> Nota: Este é um projeto de estudo criado para aprender e simular o trabalho em equipe de desenvolvimento,
> seguindo práticas profissionais e fluxos de trabalho colaborativos.

---

## 🗂 Estrutura do Projeto

```
b2b-saas-ai-support/
├─ .github/                 # CI/CD, templates e configurações
├─ app/                     # Next.js App Router
│  ├─ api/                  # API Routes
│  ├─ auth/                 # Páginas de autenticação
│  └─ layout.tsx            # Layout principal
├─ features/                # Arquitetura baseada em features
│  ├─ auth/                 # Autenticação e autorização
│  ├─ dashboard/            # Dashboard e analytics
│  ├─ tickets/              # Sistema de tickets
│  ├─ billing/              # Gestão de cobrança
│  ├─ tenants/              # Multi-tenancy
│  └─ support/              # Suporte AI
├─ shared/                  # Código compartilhado
│  ├─ ui/                   # Componentes UI reutilizáveis
│  ├─ lib/                  # Bibliotecas e utilitários
│  └─ constants/            # Constantes e configurações
├─ prisma/                  # Schema e migrations do banco
├─ __tests__/               # Testes automatizados
└─ public/                  # Arquivos estáticos
```

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

Este é um projeto de estudo, mas seguimos práticas profissionais:

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

## 📊 Roadmap do Projeto

<div align="center">

| Etapa | Objetivo | Status |
|-------|----------|--------|
| 1️⃣ **Autenticação Multi-Tenant** | NextAuth.js + middleware para separar dados por empresa | 🟡 Em planejamento |
| 2️⃣ **CRUD de Tickets** | Criar, ler, atualizar e deletar tickets com validação e testes | ⚪ Pendente |
| 3️⃣ **IA para Respostas Automáticas** | OpenAI GPT-4 + RAG para FAQ e respostas inteligentes | ⚪ Pendente |
| 4️⃣ **Dashboard de Métricas e Analytics** | Visualizar métricas de tickets, suporte e faturamento | ⚪ Pendente |
| 5️⃣ **Integração Stripe (Planos SaaS)** | Checkout, webhooks e histórico de pagamentos | ⚪ Pendente |

</div>

### 🔄 Fluxo Sugerido
1. Comece configurando a **autenticação multi-tenant** – todas as outras features dependem dela.
2. Desenvolva o **CRUD de tickets** para garantir que o core do sistema esteja funcional.
3. Adicione a **IA para respostas automáticas**, testando em sandbox.
4. Construa o **dashboard de métricas**, conectando dados dos tickets e faturamento.
5. Finalize com a **integração do Stripe**, garantindo que pagamentos e assinaturas funcionem corretamente.

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

Para detalhes sobre cada módulo e guias de desenvolvimento, consulte:

- [Padrões de Desenvolvimento](./DEVELOPMENT_GUIDELINES.md)
- [Branch Strategy](./BRANCH_STRATEGY.md)
- [CI/CD Guide](./CI_CD_GUIDE.md)
- [Commit Messages](./COMMIT_MESSAGES.md)
- [API Client Guide](./API_CLIENT_GUIDE.md)
- [Formulários](docs/FORMS_GUIDE.md)
- [Tipos](docs/TYPES_GUIDE.md)

> Nota: Este projeto simula um ambiente de desenvolvimento profissional para aprendizado das práticas
> e fluxos de trabalho de equipes de desenvolvimento.

---

<div align="center"> <br> <strong>Desenvolvido com ❤️ para aprendizado em engenharia e desenvolvimento de software profissional</strong> </div>
