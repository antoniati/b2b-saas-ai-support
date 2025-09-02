import { handleApiResponse, validateSchema } from '@/shared';
import { UserAction, RegisterSchema } from '@/features/users';

/** API para registrar um novo usuário */
export async function POST(req: Request) {
  return handleApiResponse(async () => {
    const { planId, ...values } = await req.json();
    validateSchema(RegisterSchema, values);
    const actionResponse = await UserAction.registerUser(values, planId);
    return actionResponse;
  });
}
