// Importar a classe NextResponse do Next.js para criar respostas HTTP
import { NextResponse } from "next/server";

// Importa a interface ActionResponse e as constantes de mensagens de erro
import { type ApiResponse, ERROR_MESSAGES } from "@/shared";

/**
 * Função para lidar com respostas de APIs.
 *
 * O objetivo desta função é centralizar a lógica de tratamento de erros e
 * responses de APIs.
 *
 * @param {() => Promise<T>} apiFn - Função assíncrona que retorna uma promessa de response da API.
 * @returns {Promise<NextResponse>} Uma response HTTP com o status e dados da response da API.
 */
export const handleApiResponse = async <T extends ApiResponse<unknown>>(
  apiFn: () => Promise<T>,
): Promise<NextResponse> => {
  try {
    const apiResponse = await apiFn();
    return sendResponse(apiResponse);
  } catch (error: any) {
    const status = error.statusCode || 400;
    const message = error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;

    return NextResponse.json(
      {
        ok: false,
        status,
        message,
      },
      { status },
    );
  }
};

/**
 * Envia uma resposta HTTP com o status e dados da ActionResponse.
 *
 * Se a resposta for de sucesso (ok === true), envia uma resposta com status 200 e os dados da resposta.
 * Se a resposta for de erro (ok === false), envia uma resposta com o status informado e a mensagem de erro.
 *
 * @param {ApiResponse<unknown>} response - Resposta a ser enviada
 * @returns {NextResponse} Resposta HTTP
 */
const sendResponse = (response: ApiResponse<unknown>): NextResponse => {
  if (response.ok) {
    return NextResponse.json({
      ok: true,
      status: response.status,
      message: response.message,
      data: response.data,
    });
  } else {
    return NextResponse.json(
      {
        ok: false,
        status: response.status,
        message: response.message,
      },
      { status: response.status },
    );
  }
};
