// Importa z do zod para criar o schema de validação
import { z } from "zod";

// Importa o schema de validação do tenant
import { TenantSchema } from "@/features/tenants";

/**
 * Tipos do tenant
 */
export type TenantData = {
  id: string;
  name: string;
  slug: string;
  planId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Tipos do formulário do tenant
 */
export type TenantFormValues = z.infer<typeof TenantSchema>;

/**
 * Tipos de resposta dos dados do tenant
 */
export type TenantResponse = Pick<TenantData, "id" | "name" | "slug">;

// Interface para o contexto da solicitação
export type TenantRequestContextProps = {
  userId: string | null;
  tenantId: string | null;
};

// Interface para o contexto da rota
export interface AppRouteHandlerFnContext {
  params?: Record<string, string | string[]>;
}
