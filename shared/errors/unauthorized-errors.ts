import { DomainError } from "./domain-errors";

/**
 * 401 - Usuário não autenticado
 */
export class UnauthorizedError extends DomainError {
  constructor(message = "Usuário não autenticado") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}
