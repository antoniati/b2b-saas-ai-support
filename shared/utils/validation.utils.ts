import { ZodType } from 'zod';
import { DomainError } from '@/shared';

export const validateSchema = <TOutput>(
  schema: ZodType<TOutput>,
  values: unknown,
  errorStatus = 422,
): TOutput => {
  const parsed = schema.safeParse(values);

  if (!parsed.success) {
    const errors: Record<string, string> = {};

    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.') || 'form';

      // se já existe erro nesse campo, concatena
      if (errors[path]) {
        errors[path] += `, ${issue.message}`;
      } else {
        errors[path] = issue.message;
      }
    }

    throw new DomainError(
      parsed.error.issues[0]?.message || 'Erro de validação.',
      errorStatus,
      errors,
    );
  }

  return parsed.data;
};
