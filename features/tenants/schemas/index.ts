// Improrta z do zod para criar o schema de validação do tenant
import { z } from "zod";

// Importa a constante de mensagens de erro
import { ERROR_MESSAGES } from "@/shared";

// Schema de validação do tenant (runtime validation)
export const TenantSchema = z.object({
  name: z.string().min(1, ERROR_MESSAGES.TENANT_NAME_REQUIRED),
  planId: z.string().min(1, ERROR_MESSAGES.TENANT_PLAN_REQUIRED),
  slug: z
    .string()
    .min(1, ERROR_MESSAGES.TENANT_SLUG_REQUIRED)
    .regex(/^[a-z0-9-]+$/, ERROR_MESSAGES.TENANT_SLUG_INVALID),
});
