import { NextRequest } from 'next/server'; // Importar a interface NextRequest

import { DEFAULT_LOGIN_REDIRECT } from '@/features/users/auth/config/routes.config'; // Importar a página principal configurada

/**
 * Função para gerenciar rotas de autenticação, redirecionando usuários autenticados para a página principal
 * e permitindo o acesso às rotas de autenticação para usuários não autenticados.
 *
 * Essa função verifica o estado de login do usuário e realiza o redirecionamento adequado.
 * Se o usuário estiver autenticado, ele é redirecionado para a página principal configurada. Caso contrário,
 * a execução continua na rota de autenticação.
 *
 * @param {NextRequest} req - Objeto de requisição que contém informações sobre a URL atual.
 * @param {boolean} isLoggedIn - Flag que indica se o usuário está autenticado ou não.
 * @returns {Response | void} - Retorna uma resposta de redirecionamento se o usuário estiver autenticado,
 * ou nada se o usuário não estiver autenticado.
 *
 * @example
 * // Redireciona usuários autenticados para a página principal
 * handleAuthRoute(req, true); // Redireciona para a página principal
 *startsWith
 * // Permite o acesso para usuários não autenticados
 * handleAuthRoute(req, false); // Continua no fluxo de autenticação
 */
export const handleAuthRoute = (req: NextRequest, isLoggedIn: boolean): Response | void => {
  // Obtém a URL da próxima requisição
  const { nextUrl } = req;

  // Verifica se o usuário está autenticado e redireciona para a página principal se sim
  if (isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  return; // Não redireciona se o usuário não estiver autenticado
};
