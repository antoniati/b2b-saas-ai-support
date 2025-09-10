import { DomainError } from "@/shared";
import { ERROR_MESSAGES } from "../constants/error-messages";

/**
 * Mapeia erros do Resend para DomainErrors.
 */
export function mapResendError(error: any): never {
  // Log detalhado para debug (não exposto ao usuário)
  console.error("Erro do Resend:", {
    name: error?.name,
    message: error?.message,
    statusCode: error?.statusCode,
    body: error?.body,
  });

  if (error?.statusCode) {
    switch (error.statusCode) {
      case 400:
        throw new DomainError(ERROR_MESSAGES.EMAIL_INVALID, 400, {
          to: ERROR_MESSAGES.EMAIL_INVALID,
        });

      case 401:
        throw new DomainError(ERROR_MESSAGES.EMAIL_UNAUTHORIZED, 401, {
          resend: ERROR_MESSAGES.EMAIL_UNAUTHORIZED,
        });

      case 429:
        throw new DomainError(ERROR_MESSAGES.EMAIL_RATE_LIMIT, 429, {
          resend: ERROR_MESSAGES.EMAIL_RATE_LIMIT,
        });

      case 500:
        throw new DomainError(ERROR_MESSAGES.EMAIL_PROVIDER_ERROR, 502, {
          resend: ERROR_MESSAGES.EMAIL_PROVIDER_ERROR,
        });
    }
  }

  // fallback genérico
  throw new DomainError(ERROR_MESSAGES.EMAIL_SENDING_FAILED, 500);
}
