export const runtime = "nodejs";

/** API para reenviar o email de confirmação */
export async function POST(req: Request) {
  const { handleApiResponse, validateSchema } = await import("@/shared");
  const { CreateUserSchema } = await import("@/features/users");
  const { AuthAction } = await import("@/features/auth");

  return handleApiResponse(async () => {
    const { ...values } = await req.json();
    validateSchema(CreateUserSchema, values);
    const actionResponse = await AuthAction.passwordRecover(values);
    return actionResponse;
  });
}
