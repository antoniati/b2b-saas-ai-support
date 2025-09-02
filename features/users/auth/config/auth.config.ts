import type { NextAuthConfig } from 'next-auth'; // Importando o tipo NextAuthConfig para a configuração do NextAuth.

import { googleProvider } from '@/features/users/auth/auth-providers/google.provider'; // Importando o provedor de autenticação via Google.
import { credentialsProvider } from '@/features/users/auth/auth-providers/credentials.provider'; // Importando o provedor de autenticação por credenciais personalizadas.

/**
 * Configuração do NextAuth que define os provedores de autenticação para o sistema.
 * No caso, os provedores são o Google e as credenciais personalizadas (via nome de usuário e senha).
 *
 * @constant {NextAuthConfig} authConfig
 * @example
 * // Esta configuração é usada para definir os provedores de autenticação para o NextAuth.
 * console.log(authConfig.providers); // [googleProvider, credentialsProvider]
 */
const authConfig: NextAuthConfig = {
  providers: [googleProvider, credentialsProvider],
};

export default authConfig;
