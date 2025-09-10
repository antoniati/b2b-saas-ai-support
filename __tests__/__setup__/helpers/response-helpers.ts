export async function parseResponse(res: Response) {
  const data = await res.json();
  return { status: res.status, ...data };
}

export async function expectApiSuccess(res: Response, expectedData?: any) {
  const parsed = await parseResponse(res);
  expect(parsed.ok).toBe(true);
  expect(parsed.status).toBe(200);
  if (expectedData) expect(parsed.data).toEqual(expectedData);
}

export async function expectApiError(
  res: Response,
  status: number,
  message?: string,
) {
  const parsed = await parseResponse(res);
  expect(parsed.ok).toBe(false);
  expect(parsed.status).toBe(status);
  if (message) expect(parsed.message).toContain(message);
}
