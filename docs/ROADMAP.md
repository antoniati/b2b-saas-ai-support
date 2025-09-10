# 📊 Roadmap Detalhado

Este documento detalha a ordem de implementação das principais features do projeto.

---

## 🔄 Fluxo de Desenvolvimento

1. **Autenticação Multi-Tenant**
   - NextAuth + Prisma Adapter
   - Middleware de contexto de tenant
   - RLS no Postgres

2. **CRUD de Tickets**
   - Modelagem no Prisma
   - Repositories, Services, Actions
   - Endpoints REST/Next.js API
   - Testes unitários e de integração

3. **IA para Respostas Automáticas**
   - Integração OpenAI GPT-4
   - RAG (FAQ embeddings)
   - Testes de respostas com mocks

4. **Dashboard de Métricas e Analytics**
   - UI em Next.js + Tailwind
   - Recharts para visualização
   - Integração com dados de tickets

5. **Integração Stripe (Planos SaaS)**
   - Checkout + Webhooks
   - Assinaturas vinculadas ao tenant
   - Testes com Stripe CLI

---

## 📌 Status Atual

- ✅ Autenticação Multi-Tenant → Concluída
- 🟡 CRUD de Tickets → Em andamento
- ⚪ IA para Respostas Automáticas → Pendente
- ⚪ Dashboard → Pendente
- ⚪ Stripe Billing → Pendente

---
