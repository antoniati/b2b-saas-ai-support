import prisma from "../shared/lib/prisma";
import { TenantRequestContext } from "@/features/tenants/contexts/tenants-context";
import { TicketStatus, Role } from "@prisma/client";

/**
 * Função para criar dados iniciais para o banco de dados com contexto de tenant.
 *
 * Cria os seguintes dados:
 * - 2 tenants: Tenant A e Tenant B
 * - 2 usuários: Alice em Tenant A e Bob em Tenant B
 * - 2 tickets: Ticket A1 em Tenant A e Ticket B1 em Tenant B
 * - 2 respostas: resposta inicial para Ticket A1 e resposta inicial para Ticket B1
 * - 2 artigos de FAQ: FAQ A1 em Tenant A e FAQ B1 em Tenant B
 * - 2 embeddings de FAQ: um para FAQ A1 e outro para FAQ B1
 */
async function main() {
  // Criando tenants
  const tenantA = await prisma.tenant.create({
    data: {
      id: "tenant-a",
      name: "Tenant A",
      slug: "tenant-a",
      active: true,
      planId: "plan-1",
    },
  });

  const tenantB = await prisma.tenant.create({
    data: {
      id: "tenant-b",
      name: "Tenant B",
      slug: "tenant-b",
      active: true,
      planId: "plan-1",
    },
  });

  // Criando usuários
  const userA1 = await prisma.user.create({
    data: {
      id: "user-a1",
      name: "Alice",
      email: "alice@tenant-a.com",
      password: "hashed-password",
      role: Role.OWNER,
      tenantId: tenantA.id,
    },
  });

  const userB1 = await prisma.user.create({
    data: {
      id: "user-b1",
      name: "Bob",
      email: "bob@tenant-b.com",
      password: "hashed-password",
      role: Role.OWNER,
      tenantId: tenantB.id,
    },
  });

  // Função para criar dados com contexto do tenant
  const runTenant = async (tenantId: string, fn: () => Promise<void>) => {
    return TenantRequestContext.run({ tenantId, userId: tenantId }, fn);
  };

  // Tickets e respostas
  await runTenant(tenantA.id, async () => {
    const ticket = await prisma.ticket.create({
      data: {
        id: "ticket-a1",
        subject: "Problema A1",
        content: "Conteúdo do ticket A1",
        status: TicketStatus.OPEN,
        tenantId: tenantA.id,
        creatorId: userA1.id,
        assigneeId: userA1.id,
        responses: {
          create: [
            {
              id: "response-a1",
              message: "Resposta inicial do ticket A1",
              isAi: false,
              senderId: userA1.id,
            },
          ],
        },
      },
    });

    const faq = await prisma.faqArticle.create({
      data: {
        id: "faq-a1",
        tenantId: tenantA.id,
        question: "Como criar ticket?",
        answer: "Clique no botão de novo ticket",
        FaqEmbedding: {
          create: [
            {
              id: "embedding-a1",
              vector: [0.1, 0.2, 0.3],
            },
          ],
        },
      },
    });
  });

  await runTenant(tenantB.id, async () => {
    const ticket = await prisma.ticket.create({
      data: {
        id: "ticket-b1",
        subject: "Problema B1",
        content: "Conteúdo do ticket B1",
        status: TicketStatus.OPEN,
        tenantId: tenantB.id,
        creatorId: userB1.id,
        assigneeId: userB1.id,
        responses: {
          create: [
            {
              id: "response-b1",
              message: "Resposta inicial do ticket B1",
              isAi: false,
              senderId: userB1.id,
            },
          ],
        },
      },
    });

    const faq = await prisma.faqArticle.create({
      data: {
        id: "faq-b1",
        tenantId: tenantB.id,
        question: "Como resetar senha?",
        answer: "Clique em esqueci minha senha",
        FaqEmbedding: {
          create: [
            {
              id: "embedding-b1",
              vector: [0.4, 0.5, 0.6],
            },
          ],
        },
      },
    });
  });

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
