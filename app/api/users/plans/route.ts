export const runtime = "nodejs";

/** API para buscar todos os planos */
export async function GET() {
  const { handleApiResponse } = await import("@/shared");
  const { PlansAction } = await import("@/features/plans");

  return handleApiResponse(async () => {
    const foundPlans = await PlansAction.fetchAllPlansAction();
    return foundPlans;
  });
}
