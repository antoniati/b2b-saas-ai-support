import { handleApiResponse, validateSchema } from "@/shared";
import { CreateUserSchema } from "@/features/users";
import { AuthAction } from "@/features/auth";

/** API para reenviar o email de confirmação */
export async function POST(req: Request) {
  return handleApiResponse(async () => {
    const { ...values } = await req.json();
    validateSchema(CreateUserSchema, values);
    const actionResponse = await AuthAction.passwordRecover(values);
    return actionResponse;
  });
}
