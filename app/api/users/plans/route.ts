import { handleApiResponse } from "@/shared";
import { PlansAction } from "@/features/plans";

/** API para buscar todos os planos */
export async function GET() {
  return handleApiResponse(async () => {
    const foundPlans = await PlansAction.fetchAllPlansAction();
    return foundPlans;
  });
}
