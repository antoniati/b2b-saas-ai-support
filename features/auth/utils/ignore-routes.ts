/**
 * Verifica se a autenticação deve ser ignorada para uma rota específica.
 * Isso é útil para rotas de webhooks que não exigem autenticação.
 *
 * @param {string} pathname - O caminho da URL da requisição, utilizado para determinar se a rota deve ser ignorada.
 * @returns {boolean} - Retorna `true` se a rota corresponder a uma das rotas de webhook e, portanto, a autenticação deve ser ignorada;
 * caso contrário, retorna `false`.
 *
 * @example
 * // Verifica se a rota de webhook do Stripe deve ignorar a autenticação
 * const bypassAuth = shouldBypassAuth("/api/webhooks/stripe");
 *
 * // Retorna true, pois a rota está na lista de webhooks
 * console.log(bypassAuth); // true
 */
export const shouldBypassAuth = (pathname: string) => {
  // Lista de rotas de webhook que não exigem autenticação
  const webhookRoutes = ["/api/webhooks/stripe"];

  return webhookRoutes.includes(pathname); // Verifica se a rota está na lista de webhooks
};
