export const runtime = "nodejs";

/** API para completar o registro */
export async function POST(req: Request) {
  const { handleApiResponse } = await import("@/shared");
  const { AuthAction } = await import("@/features/auth");

  return handleApiResponse(async () => {
    const { token, ...values } = await req.json();
    const actionResponse = await AuthAction.completeRegistration({
      token,
      password: values.password,
    });
    return actionResponse;
  });
}
