/**
 * Função para gerenciar o acesso às rotas privadas. Se o usuário não estiver autenticado,
 * ele será redirecionado para a página de login com a URL atual como `callbackUrl`.
 * Algumas rotas específicas, são permitidas para o público.
 *
 * @param {Request} req - Objeto de requisição que contém a URL da solicitação.
 * @param {URL} nextUrl - URL do próximo destino da requisição, utilizada para construir o redirecionamento.
 * @returns {Response | void} - Retorna uma resposta de redirecionamento para a página de login se o usuário
 * não estiver autenticado ou permite o acesso à página caso contrário.
 *
 * @example
 * // Redireciona usuários não autenticados para a página de login
 * handlePrivateRoute(req, nextUrl);
 *
 * // Permite acesso público às rotas permitidas
 * handlePrivateRoute(req, new URL("/rotas-permitidas/1", req.url));
 */
export const handlePrivateRoute = (_req: Request, nextUrl: URL) => {
  const { pathname, search } = nextUrl;

  if (pathname.startsWith('/rotas-permitidas/')) {
    return; // Permitir acesso público à rota de detalhes do produto
  }

  // Redirecionar para a página de login com a URL atual como callbackUrl (para redirecionamento pós-login)
  let callbackUrl = pathname;

  // Incluir parâmetros de consulta na URL de callback
  if (search) {
    callbackUrl += search;
  }

  const encodedCallbackUrl = encodeURIComponent(callbackUrl); // Codificar a URL de callback

  // Redirecionar para a página de login com a URL de callback codificada
  return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
};
