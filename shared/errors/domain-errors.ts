/**
 * Erro base para regras de negócio/domínio.
 * Todos os erros específicos devem herdar dele.
 */
export class DomainError extends Error {
  status: number;
  errors?: Record<string, string>;

  constructor(message: string, status = 400, errors?: Record<string, string>) {
    super(message);
    this.name = "DomainError";
    this.status = status;
    this.errors = errors;
  }
}
