// Importa o AsyncLocalStorage
import { AsyncLocalStorage } from "async_hooks";

// Importa os tipos do contexto de solicitação
import { type TenantRequestContextProps } from "@/features/tenants";

// Cria um AsyncLocalStorage para armazenar o contexto de solicitação
const contextStorage = new AsyncLocalStorage<TenantRequestContextProps>();

/**
 * Cria contexto Global para Tenant
 */
export const TenantRequestContext = {
  /**
   * Retorna o contexto da solicitação atual.
   *
   * Este método retorna o contexto da solicitação atual. Se o contexto da solicitação
   * não estiver definido, retorna um contexto vazio com `tenantId` e `userId` igual a `null`.
   * @returns O contexto da solicitação atual.
   */
  get(): TenantRequestContextProps {
    const context = contextStorage.getStore();
    if (!context) return { tenantId: null, userId: null };
    return context;
  },

  /**
   * Executa uma função com um contexto de solicitação diferente do atual.
   *
   * Este método executa uma função com um contexto de solicitação diferente do atual.
   * O contexto de solicitação original   restaurado após a execução da função.
   * @param context O contexto de solicitação a ser usado na execução da função.
   * @param callback A função a ser executada com o contexto de solicitação especificado.
   * @returns O valor retornado pela função.
   */
  run<T>(context: TenantRequestContextProps, callback: () => T): T {
    return contextStorage.run(context, callback);
  },

  /**
   * Verifica se o contexto de solicitação atual é autenticado.
   *
   * Este método verifica se o contexto de solicitação atual é autenticado.
   * O contexto de solicitação   considerado autenticado se o seu `tenantId` e `userId`
   * forem diferentes de `null`.
   * @returns `true` se o contexto de solicitação for autenticado, caso contrário, `false`.
   */
  isAuthenticated(): boolean {
    const context = this.get();
    return !!context.tenantId && !!context.userId;
  },
};
