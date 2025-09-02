// tests/utils/api.ts

/**
 * Faz o parse da Response e retorna status + JSON já junto
 */
export async function parseResponse(res: Response) {
  const data = await res.json();
  return { status: res.status, ...data };
}

/**
 * Espera uma resposta de sucesso no padrão ActionResponse
 */
export async function expectApiSuccess(res: Response, expectedData?: any) {
  const parsed = await parseResponse(res);

  expect(parsed.ok).toBe(true);
  expect(parsed.status).toBe(200);

  if (expectedData) {
    expect(parsed.data).toEqual(expectedData);
  }
}

/**
 * Espera uma resposta de erro no padrão ActionResponse
 */
export async function expectApiError(res: Response, status: number, message?: string) {
  const parsed = await parseResponse(res);

  expect(parsed.ok).toBe(false);
  expect(parsed.status).toBe(status);

  if (message) {
    expect(parsed.message).toContain(message);
  }
}

/**
 * Cria um objeto Request mockado (POST por padrão)
 */
export function mockRequest(
  body: any,
  method: string = 'POST',
  url: string = 'http://localhost/api/test',
) {
  return new Request(url, {
    method,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}
