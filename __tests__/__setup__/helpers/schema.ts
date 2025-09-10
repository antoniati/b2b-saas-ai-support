import { PrismaClient } from "@prisma/client";

/**
 * Configura o schema do banco de dados para os testes.
 * Isso é feito criando as tabelas, habilitando RLS e criando as policies.
 * @param prisma Prisma client para executar as queries.
 */
export async function setupSchema(prisma: PrismaClient) {
  // Criar tabelas
  await prisma.$executeRaw`
   CREATE TABLE "Tenant" (id TEXT PRIMARY KEY, slug TEXT, name TEXT);
    CREATE TABLE "User" (id TEXT PRIMARY KEY, email TEXT, tenantId TEXT);
    CREATE TABLE "Ticket" (id TEXT PRIMARY KEY, subject TEXT, tenantId TEXT, creatorId TEXT);
    CREATE TABLE "TicketResponse" (id TEXT PRIMARY KEY, ticketId TEXT, message TEXT);
    CREATE TABLE "FaqArticle" (id TEXT PRIMARY KEY, question TEXT, tenantId TEXT);
    CREATE TABLE "FaqEmbedding" (id TEXT PRIMARY KEY, faqId TEXT, vector FLOAT[]);
  `;

  // Habilitar RLS
  await prisma.$executeRaw`
    ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "Ticket" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "TicketResponse" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "FaqArticle" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "FaqEmbedding" ENABLE ROW LEVEL SECURITY;
  `;

  // Policies User
  await prisma.$executeRaw`
    CREATE POLICY user_select_policy ON "User" FOR SELECT USING (tenantId = current_setting('app.tenant_id')::text);
    CREATE POLICY user_insert_policy ON "User" FOR INSERT WITH CHECK (tenantId = current_setting('app.tenant_id')::text);
    CREATE POLICY user_delete_policy ON "User" FOR DELETE USING (tenantId = current_setting('app.tenant_id')::text);
    ALTER TABLE "User" FORCE ROW LEVEL SECURITY;
  `;

  // Policies Ticket
  await prisma.$executeRaw`
    CREATE POLICY ticket_select_policy ON "Ticket" FOR SELECT USING (tenantId = current_setting('app.tenant_id')::text);
    CREATE POLICY ticket_insert_policy ON "Ticket" FOR INSERT WITH CHECK (tenantId = current_setting('app.tenant_id')::text);
    CREATE POLICY ticket_delete_policy ON "Ticket" FOR DELETE USING (tenantId = current_setting('app.tenant_id')::text);
    ALTER TABLE "Ticket" FORCE ROW LEVEL SECURITY;
  `;

  // Policies TicketResponse
  await prisma.$executeRaw`
    CREATE POLICY ticketresponse_select_policy ON "TicketResponse" FOR SELECT USING (EXISTS (SELECT 1 FROM "Ticket" t WHERE t.id = "TicketResponse".ticketId AND t.tenantId = current_setting('app.tenant_id')::text));
    CREATE POLICY ticketresponse_insert_policy ON "TicketResponse" FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM "Ticket" t WHERE t.id = NEW.ticketId AND t.tenantId = current_setting('app.tenant_id')::text));
    CREATE POLICY ticketresponse_delete_policy ON "TicketResponse" FOR DELETE USING (EXISTS (SELECT 1 FROM "Ticket" t WHERE t.id = "TicketResponse".ticketId AND t.tenantId = current_setting('app.tenant_id')::text));
    ALTER TABLE "TicketResponse" FORCE ROW LEVEL SECURITY;
  `;

  // Policies FaqArticle
  await prisma.$executeRaw`
    CREATE POLICY faq_select_policy ON "FaqArticle" FOR SELECT USING (tenantId = current_setting('app.tenant_id')::text);
    CREATE POLICY faq_insert_policy ON "FaqArticle" FOR INSERT WITH CHECK (tenantId = current_setting('app.tenant_id')::text);
    CREATE POLICY faq_delete_policy ON "FaqArticle" FOR DELETE USING (tenantId = current_setting('app.tenant_id')::text);
    ALTER TABLE "FaqArticle" FORCE ROW LEVEL SECURITY;
  `;

  // Policies FaqEmbedding
  await prisma.$executeRaw`
    CREATE POLICY faqembedding_select_policy ON "FaqEmbedding" FOR SELECT USING (EXISTS (SELECT 1 FROM "FaqArticle" f WHERE f.id = "FaqEmbedding".faqId AND f.tenantId = current_setting('app.tenant_id')::text));
    CREATE POLICY faqembedding_insert_policy ON "FaqEmbedding" FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM "FaqArticle" f WHERE f.id = NEW.faqId AND f.tenantId = current_setting('app.tenant_id')::text));
    CREATE POLICY faqembedding_delete_policy ON "FaqEmbedding" FOR DELETE USING (EXISTS (SELECT 1 FROM "FaqArticle" f WHERE f.id = "FaqEmbedding".faqId AND f.tenantId = current_setting('app.tenant_id')::text));
    ALTER TABLE "FaqEmbedding" FORCE ROW LEVEL SECURITY;
  `;
}
