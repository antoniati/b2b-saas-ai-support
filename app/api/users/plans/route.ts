import { handleApiResponse } from '@/shared';
import { PlansAction } from '@/features/users';

/** API para buscar todos os planos */
export async function GET() {
  return handleApiResponse(async () => {
    const foundPlans = await PlansAction.fetchAllPlansAction();
    return foundPlans;
  });
}
