export const runtime = "nodejs";

/** API para reenviar o email de confirmação */
export async function POST(req: Request) {
  const { handleApiResponse } = await import("@/shared");
  const { AuthAction } = await import("@/features/auth");

  return handleApiResponse(async () => {
    const { email } = await req.json();
    const actionResponse = await AuthAction.resendTwoFactorCode(email);
    return actionResponse;
  });
}
