import { handleApiResponse } from "@/shared";
import { AuthAction } from "@/features/auth";

/** API para completar o registro */
export async function POST(req: Request) {
  return handleApiResponse(async () => {
    const { token, ...values } = await req.json();
    const actionResponse = await AuthAction.completeRegistration({
      token,
      password: values.password,
    });
    return actionResponse;
  });
}
