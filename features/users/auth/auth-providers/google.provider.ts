import Google from 'next-auth/providers/google'; // Utilizado para fornecer dados de login via Google

/**
 * Provedor de autenticação via Google usando o NextAuth.
 *
 * Este provedor permite que os usuários façam login utilizando sua conta do Google.
 * As credenciais do cliente (clientId e clientSecret) são carregadas a partir das variáveis de ambiente.
 *
 * @constant {object} googleProvider
 * @see https://next-auth.js.org/providers/google
 * @example
 * // O provedor é utilizado no NextAuth para permitir o login via Google:
 * console.log(googleProvider); // Provedor de autenticação do Google configurado
 */
export const googleProvider = Google({
  clientId: process.env.GOOGLE_CLIENT_ID, // ID do cliente do Google.
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Segredo do cliente do Google.
});
