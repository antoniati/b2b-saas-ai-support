// Importa a interface ZodType do Zod para lidar com validação
import { type ZodType } from "zod";

// Importa a classe DomainError e as constantes de mensagens de erro
import { DomainError, ERROR_MESSAGES } from "@/shared";

/**
 * Valida um schema do Zod com os valores fornecidos e retorna
 * o objeto parseado. Se a validação falhar, lança um erro do tipo
 * DomainError com o status http fornecido (padrão 422).
 *
 * @param schema ZodType do schema a ser validado
 * @param values Valores a serem validados
 * @param errorStatus Status http a ser retornado em caso de erro
 * @returns O objeto parseado e validado
 */
export const validateSchema = <TOutput>(
  schema: ZodType<TOutput>,
  values: unknown,
  errorStatus = 422,
): TOutput => {
  // valida o schema
  const parsed = schema.safeParse(values);

  // se falhar, lanca um erro
  if (!parsed.success) {
    const errors: Record<string, string> = {};

    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".") || "form";

      // se já existe erro nesse campo, concatena
      if (errors[path]) {
        errors[path] += `, ${issue.message}`;
      } else {
        errors[path] = issue.message;
      }
    }

    throw new DomainError(
      parsed.error.issues[0]?.message || ERROR_MESSAGES.INVALID_FIELDS,
      errorStatus,
      errors,
    );
  }

  // retorna o objeto parseado e validado se tudo der certo
  return parsed.data;
};
