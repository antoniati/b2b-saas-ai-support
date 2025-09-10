import { DomainError } from "./domain-errors";

/**
 * 403 - Acesso negado (usuário autenticado mas sem permissão)
 */
export class ForbiddenError extends DomainError {
  constructor(message = "Acesso negado") {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}
