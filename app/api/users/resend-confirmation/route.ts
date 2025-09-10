import { handleApiResponse } from "@/shared";
import { AuthAction } from "@/features/auth";

/** API para reenviar o email de confirmação */
export async function POST(req: Request) {
  return handleApiResponse(async () => {
    const { email } = await req.json();
    const actionResponse = await AuthAction.resendTwoFactorCode(email);
    return actionResponse;
  });
}
