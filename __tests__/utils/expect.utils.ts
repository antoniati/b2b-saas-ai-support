import { ActionResponse } from '@/shared';

export function expectSuccess<T>(
  res: ActionResponse<T>,
): asserts res is { ok: true; status: number; message: string; data: T } {
  expect(res.ok).toBe(true);
}

export function expectFailure(
  res: ActionResponse,
): asserts res is { ok: false; status: number; message: string; errors?: Record<string, string> } {
  expect(res.ok).toBe(false);
}
