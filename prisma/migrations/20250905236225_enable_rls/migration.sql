-- =======================
-- Habilitar RLS
-- =======================

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Ticket" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TicketResponse" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FaqArticle" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FaqEmbedding" ENABLE ROW LEVEL SECURITY;

-- USER Policies
CREATE POLICY user_select_policy ON "User"
  FOR SELECT
  USING ("tenantId" = current_setting('app.tenant_id')::text);
CREATE POLICY user_modify_policy ON "User"
  FOR ALL
  USING ("tenantId" = current_setting('app.tenant_id')::text);
  
-- TICKET Policies
CREATE POLICY ticket_select_policy ON "Ticket"
  FOR SELECT
  USING ("tenantId" = current_setting('app.tenant_id')::text);
  CREATE POLICY ticket_modify_policy ON "Ticket"
  FOR ALL
  USING ("tenantId" = current_setting('app.tenant_id')::text);

-- TICKET RESPONSE Policies
CREATE POLICY ticketresponse_select_policy ON "TicketResponse"
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM "Ticket" t
    WHERE t.id = "TicketResponse"."ticketId"
      AND t."tenantId" = current_setting('app.tenant_id')::text
  ));
CREATE POLICY ticketresponse_modify_policy ON "TicketResponse"
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM "Ticket" t
    WHERE t.id = "TicketResponse"."ticketId"
      AND t."tenantId" = current_setting('app.tenant_id')::text
  ));
  
-- FAQ Policies
CREATE POLICY faq_select_policy ON "FaqArticle"
  FOR SELECT
  USING ("tenantId" = current_setting('app.tenant_id')::text);
CREATE POLICY faq_modify_policy ON "FaqArticle"
  FOR ALL
  USING ("tenantId" = current_setting('app.tenant_id')::text);

-- FAQ EMBEDDING Policies
CREATE POLICY faqembedding_select_policy ON "FaqEmbedding"
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM "FaqArticle" f
    WHERE f.id = "FaqEmbedding"."faqId"
      AND f."tenantId" = current_setting('app.tenant_id')::text
  ));
CREATE POLICY faqembedding_modify_policy ON "FaqEmbedding"
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM "FaqArticle" f
    WHERE f.id = "FaqEmbedding"."faqId"
      AND f."tenantId" = current_setting('app.tenant_id')::text
  ));
  
-- Forçar RLS
ALTER TABLE "User" FORCE ROW LEVEL SECURITY;
ALTER TABLE "Ticket" FORCE ROW LEVEL SECURITY;
ALTER TABLE "TicketResponse" FORCE ROW LEVEL SECURITY;
ALTER TABLE "FaqArticle" FORCE ROW LEVEL SECURITY;
ALTER TABLE "FaqEmbedding" FORCE ROW LEVEL SECURITY;
