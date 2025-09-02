import { handleApiResponse, validateSchema } from '@/shared';
import { AuthAction, RegisterSchema } from '@/features/users';

/** API para reenviar o email de confirmação */
export async function POST(req: Request) {
  return handleApiResponse(async () => {
    const { ...values } = await req.json();
    validateSchema(RegisterSchema, values);
    const actionResponse = await AuthAction.passwordRecover(values);
    return actionResponse;
  });
}
