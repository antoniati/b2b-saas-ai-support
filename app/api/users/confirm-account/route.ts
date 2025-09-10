import { ERROR_MESSAGES, handleApiResponse } from "@/shared";
import { AuthAction } from "@/features/auth";

/** API para confirmar a conta */
export async function GET(request: Request) {
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
