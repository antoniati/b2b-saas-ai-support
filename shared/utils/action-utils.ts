// Importa a iterface ActionResponse, classe DomainError, e as constantes de sucesso e erro.
import {
  type ActionResponse,
  DomainError,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} from "@/shared";

/**
 * Função para lidar com a execução de server-actions assíncronas.
 *
 * A função recebe uma server-action assíncrona e retorna uma promessa de ActionResponse.
 * Caso a função execute com sucesso, a promessa é resolvida com um ActionResponse
 * com status 200 e dados retornados pela função.
 * Caso a função lance um erro, a promessa é rejeitada com um ActionResponse
 * com status 500 e mensagem de erro genérico.
 * Caso o erro seja uma instância de DomainError, a promessa é rejeitada com um
 * ActionResponse com status e mensagem de erro definidos na instância de
 * DomainError.
 *
 * @param {() => Promise<T>} actionFn - Função assíncrona a ser executada.
 * @returns {Promise<ActionResponse>} Uma promessa de ActionResponse.
 */
export const handleAction = async <T>(
  actionFn: () => Promise<T>,
): Promise<ActionResponse> => {
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

/**
 * Cria um objeto ActionResponse com status de sucesso.
 *
 * @param {number} [status=200] - Status HTTP da resposta.
 * @param {string} message - Mensagem de sucesso.
 * @param {T} [data] - Dados a serem retornados na resposta.
 * @returns {ActionResponse<T>} - Um objeto ActionResponse com status de sucesso.
 */
export const success = <T>(
  status: number = 200,
  message: string,
  data?: T,
): ActionResponse<T> => ({
  ok: true,
  status,
  message,
  data,
});

/**
 * Cria um objeto ActionResponse com status de erro.
 *
 * @param {number} [status=400] - Status HTTP da resposta.
 * @param {string} message - Mensagem de erro.
 * @param {Record<string, string>} [errors] - Dicion rio com erros de validação de campos.
 * @returns {ActionResponse} - Um objeto ActionResponse com status de erro.
 */
export const failure = (
  status: number = 400,
  message: string,
  errors?: Record<string, string>,
): ActionResponse => ({
  ok: false,
  status,
  message,
  errors,
});
