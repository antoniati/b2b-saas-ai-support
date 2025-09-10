export const runtime = "nodejs";

/** API para confirmar a conta */
export async function GET(request: Request) {
  const { ERROR_MESSAGES, handleApiResponse } = await import("@/shared");
  const { AuthAction } = await import("@/features/auth");

  return handleApiResponse(async () => {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return {
        ok: false,
        status: 400,
        message: ERROR_MESSAGES.INVALID_TOKEN,
      };
    }

    const actionResponse = await AuthAction.confirmAccount(token);
    return actionResponse;
  });
}
