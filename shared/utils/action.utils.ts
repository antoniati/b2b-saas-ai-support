import { ActionResponse, DomainError, SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/shared';

export const handleAction = async <T>(actionFn: () => Promise<T>): Promise<ActionResponse> => {
  try {
    const data = await actionFn();
    return success(200, SUCCESS_MESSAGES.OPERATION_SUCCESSFUL, data);
  } catch (err: any) {
    if (err instanceof DomainError) {
      return failure(err.status, err.message, err.errors);
    }

    return failure(500, ERROR_MESSAGES.GENERIC_ERROR);
  }
};

export const success = <T>(status = 200, message: string, data?: T): ActionResponse<T> => ({
  ok: true,
  status,
  message,
  data,
});

export const failure = (
  status = 400,
  message: string,
  errors?: Record<string, string>,
): ActionResponse => ({
  ok: false,
  status,
  message,
  errors,
});
