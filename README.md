# 🚀 B2B SaaS AI Support Platform

Plataforma SaaS de suporte ao cliente com Inteligência Artificial, multi-tenant e billing opcional.
Projeto de estudo e MVP criado para aprendizado, simulação de time de devs e integração com IA.

---

## 🗂 Estrutura do Projeto

```
project-root/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ api/health/route.ts
├─ features/
│  ├─ auth/                 # autenticação e multi-tenant
│  ├─ tenants/              # lógica de tenants
│  └─ tickets/              # sistema de tickets
├─ shared/
│  ├─ lib/                  # utils e configs
│  ├─ ui/                   # componentes reutilizáveis
│  └─ constants/            # valores fixos
├─ prisma/
│  └─ schema.prisma
├─ .eslintrc.json
├─ .prettierrc
├─ package.json
└─ tsconfig.json
```

---

## ⚡ Funcionalidades (MVP)

* Sistema multi-tenant (empresas e usuários)
* CRUD de tickets de suporte
* Integração inicial com IA (geração de respostas automáticas)
* Estrutura modular por **features** (auth, tenants, tickets)
* Página inicial e API de saúde (`/api/health`) funcionando

---

## 🛠 Tecnologias

* **Frontend:** Next.js 14 + TypeScript + TailwindCSS
* **Backend:** Next.js API Routes + Prisma
* **Banco de Dados:** PostgreSQL (local ou Supabase)
* **IA:** OpenAI API (próximo passo para MVP funcional)
* **Lint & Format:** ESLint + Prettier
* **Controle de versão:** Git com branches por feature

---

## 🚦 Roadmap (Kanban)

**To Do**

* Setup inicial do projeto
* Autenticação multi-tenant

**In Progress**

* Tickets (API e UI)

**Review**

* Integração IA (endpoint `/api/ai/reply`)

**Done**

* MVP funcional com tickets + IA básica

---

## 📥 Instalação

1. Clonar repositório:

```bash
git clone <URL_DO_REPO>
cd b2b-saas-ai-support
```

2. Instalar dependências:

```bash
npm install
```

3. Configurar banco de dados no `.env`:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

4. Criar tabelas com Prisma:

```bash
npx prisma migrate dev --name init
```

5. Rodar projeto:

```bash
npm run dev
```

6. Acessar:

```
http://localhost:3000
http://localhost:3000/api/health
```

---

## 📚 Próximos Passos

* Configurar autenticação multi-tenant (NextAuth/Clerk)
* Criar CRUD completo de tickets
* Integrar IA para respostas automáticas e RAG (FAQ)
* Dashboard de métricas e analytics
* Integração Stripe (planos SaaS)

---

## 📝 Commits e Branches

* `main` → branch estável
* `develop` → branch de integração
* `feature/*` → branches de funcionalidades
* `hotfix/*` → correções emergenciais

Exemplo de commits:

* `feat(auth): add multi-tenant auth`
* `feat(ticket-api): create ticket CRUD endpoints`
* `feat(ticket-ui): add ticket list and creation form`
* `feat(ai): integrate OpenAI reply suggestion endpoint`
* `refactor(db): optimize ticket relations`
* `chore: setup eslint and prettier configs`