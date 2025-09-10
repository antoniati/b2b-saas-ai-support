import { Prisma } from "@prisma/client";

import { DomainError, ERROR_MESSAGES } from "@/shared";

/**
 * Mapeia erros de Prisma para DomainErrors.
 */
export function mapPrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Unique constraint failed
        throw new DomainError(ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED, 400);

      case "P2003": // Foreign key constraint failed
        throw new DomainError(ERROR_MESSAGES.INVALID_REFERENCE, 400);

      case "P2025": // Record not found
        throw new DomainError(ERROR_MESSAGES.USER_NOT_FOUND, 404);

      case "P2000": // Value too long
        throw new DomainError(ERROR_MESSAGES.INVALID_INPUT, 400);

      case "P2014": // Invalid relation
        throw new DomainError(ERROR_MESSAGES.RELATION_CONFLICT, 409);
    }
  }

  // fallback genérico
  throw new DomainError(ERROR_MESSAGES.GENERIC_ERROR, 500);
}
