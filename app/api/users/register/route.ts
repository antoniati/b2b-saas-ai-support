export const runtime = "nodejs";

/**
 * Endpoint para registrar um novo usuário.
 *
 * O endpoint aceita os dados do tenant via header ex: `x-tenant-id` ou como propriedade ex: `tenantId` no corpo da requisição.
 *
 */
export async function POST(req: Request) {
  const { DomainError, ERROR_MESSAGES, handleApiResponse, validateSchema } =
    await import("@/shared");
  const { CreateUserSchema, UserAction } = await import("@/features/users");
  const { TenantRequestContext } = await import("@/features/tenants");

  return handleApiResponse(async () => {
    // Extrair os dados do tenant da requisição manualmente
    let tenantId: string | null = null;

    // Obter o corpo da requisição
    const body = await req.json();

    // Obter os dados do tenant do header ou da requisição
    tenantId = req.headers.get("x-tenant-id") || body.tenantId;

    // Validar os dados do tenant
    if (!tenantId) {
      throw new DomainError(ERROR_MESSAGES.INVALID_FIELDS, 400);
    }

    // Obter os valores do corpo da requisição para registrar o usuário
    const values = { name: body.name, email: body.email };

    // Executar a action de registro do usuário dentro do contexto do tenant
    return TenantRequestContext.run({ tenantId, userId: null }, async () => {
      validateSchema(CreateUserSchema, values);
      const actionResponse = await UserAction.inviteUser(values);
      return actionResponse;
    });
  });
}
