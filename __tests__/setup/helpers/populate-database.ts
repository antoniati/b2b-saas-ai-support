import prismaClient from "@/shared/lib/prisma";

export async function populateDatabase() {
  // 1️⃣ Cria tenants
  await prismaClient.tenant.createMany({
    data: [global.tenantA, global.tenantB],
  });

  // 2️⃣ Cria usuários vinculados aos tenants
  await prismaClient.user.createMany({
    data: [{ ...global.userA }, { ...global.userB }],
  });

  // 3️⃣ Tickets relacionados aos usuários
  await prismaClient.ticket.createMany({
    data: [
      { ...global.ticketA1, creatorId: global.userA.id },
      { ...global.ticketB1, creatorId: global.userB.id },
    ],
  });

  // 4️⃣ Ticket responses
  await prismaClient.ticketResponse.createMany({
    data: [
      { ...global.ticketResponseA1, ticketId: global.ticketA1.id },
      { ...global.ticketResponseB1, ticketId: global.ticketB1.id },
    ],
  });

  // 5️⃣ FAQs e embeddings
  await prismaClient.faqArticle.createMany({
    data: [global.faqA1, global.faqB1],
  });

  await prismaClient.faqEmbedding.createMany({
    data: [
      global.faqEmbeddingA1,
      global.faqEmbeddingA2,
      global.faqEmbeddingB1,
      global.faqEmbeddingB2,
    ],
  });
}
