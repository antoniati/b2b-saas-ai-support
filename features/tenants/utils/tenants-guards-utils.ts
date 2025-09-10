// Importa as classes UnauthorizedError e ForbiddenError
import { UnauthorizedError, ForbiddenError, ERROR_MESSAGES } from "@/shared";

// Importa o objeto literal TenantRequestContext, interface TenantRequestContextProps e constantes de mensagens de erro
import {
  TenantRequestContext,
  type TenantRequestContextProps,
} from "@/features/tenants";

/**
 * Retorna o contexto da solicitação atual, ou um objeto vazio se o contexto
 * não estiver definido.
 */
export function getRequestContext(): TenantRequestContextProps {
  return TenantRequestContext.get?.() ?? { tenantId: null, userId: null };
}

/**
 * Retorna tenantId da requisição ou null.
 */
export function getRequestTenantId(): string | null {
  return getRequestContext().tenantId ?? null;
}

/**
 * Lança UnauthorizedError se não houver tenantId ou userId na request context.
 * Use quando a operação exige usuário autenticado.
 */
export function requireAuthenticated() {
  const { tenantId, userId } = getRequestContext();
  if (!tenantId || !userId)
    throw new UnauthorizedError(ERROR_MESSAGES.TENANT_NOT_FOUND_IN_CONTEXT);
  return { tenantId, userId };
}

/**
 * Valida que o recurso pertence ao mesmo tenant da request atual.
 * Se não houver tenant no contexto (ex.: admin global), permite.
 * Lança ForbiddenError quando há mismatch.
 */
export function ensureTenantAccess(
  resourceTenantId: string | null | undefined,
) {
  const ctxTenantId = getRequestTenantId();
  console.log("encontrou tenantId no contexto:", ctxTenantId);

  if (!resourceTenantId) {
    // recurso sem tenant explícito (ex.: entidades globais) — nada a fazer
    console.log("Recurso sem tenant explícito.");
    return;
  }

  if (ctxTenantId && ctxTenantId !== resourceTenantId)
    console.log("Usuário autenticado mas sem permissão.");
  throw new ForbiddenError(ERROR_MESSAGES.TENANT_ACCESS_DENIED);
}

/**
 * Retorna tenantId da request ou lança UnauthorizedError
 */
export function requireTenantId(): string {
  const tenantId = getRequestTenantId();
  if (!tenantId)
    throw new UnauthorizedError(ERROR_MESSAGES.TENANT_NOT_FOUND_IN_CONTEXT);
  return tenantId;
}
