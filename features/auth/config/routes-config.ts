/**
 * Lista de rotas públicas da aplicação, acessíveis sem necessidade de autenticação.
 *
 * As rotas públicas são aquelas que qualquer usuário pode acessar sem estar logado, como a página inicial,
 * páginas de produtos, políticas do site e suporte.
 *
 * @constant {string[]} publicRoutes - Lista de rotas públicas.
 * @example
 * // Exemplos de rotas públicas:
 * // - "/"
 * // - "/sobre"
 */
export const publicRoutes = ["/"];

/**
 * Lista de rotas que exigem autenticação para acesso.
 *
 * As rotas de autenticação são aquelas onde o usuário precisa estar logado para acessá-las, como páginas
 * de login, erro de autenticação, recuperação de senha e redefinição de senha.
 *
 * @constant {string[]} authRoutes - Lista de rotas de autenticação.
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/confirm-account",
  "/auth/complete-registration",
  "/auth/recover-password",
  "/auth/reset-password",
  "/auth/error",
];

/**
 * Prefixo para as rotas de API de autenticação.
 *
 * Usado para centralizar todas as rotas relacionadas à autenticação (login, logout, etc.) sob um prefixo comum.
 *
 * @constant {string} apiAuthPrefix - Prefixo para rotas da API de autenticação.
 * @example
 * // Exemplo de rota de API de autenticação:
 * // - "/api/auth/login"
 * // - "/api/auth/logout"
 */
export const apiAuthPrefix = "/api/auth/";

/**
 * Redirecionamento padrão após login.
 *
 * Definido para a página inicial, mas pode ser alterado para redirecionar o usuário a uma página específica
 * após o login bem-sucedido.
 *
 * @constant {string} DEFAULT_LOGIN_REDIRECT - Rota de redirecionamento padrão após login.
 * @example
 * // Exemplo de redirecionamento:
 * // - "/"
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
