import { PrismaAdapter } from '@auth/prisma-adapter'; // Importando o adaptador Prisma para a persistência de dados.
import NextAuth from 'next-auth'; // Importando o pacote NextAuth para a autenticação.

import { prismaClient } from '@/shared/lib/prisma'; // Importando a instância do Prisma Client.

import { linkAccountEvent } from '@/features/users/auth/events/link.account'; // Importando o evento de vinculação de conta.
import { signInCallback } from '@/features/users/auth/callbacks/login.callback'; // Importando o callback de login.
import { sessionCallback } from '@/features/users/auth/callbacks/session.callback'; // Importando o callback de sessão.
import { jwtCallback } from '@/features/users/auth/callbacks/jwt.callback'; // Importando o callback JWT.

import authConfig from '@/features/users/auth/config/auth.config'; // Importando a configuração do NextAuth.

/**
 * Configuração de autenticação utilizando NextAuth.
 *
 * Este arquivo configura a autenticação do Next.js utilizando o pacote `next-auth`,
 * juntamente com o adaptador Prisma para persistir dados de autenticação no banco de dados.
 * As páginas personalizadas de autenticação são definidas e os callbacks necessários para
 * manipulação de sessões e JWT são configurados.
 *
 * **Objetivos principais:**
 * - Configuração do adaptador Prisma para persistência de dados.
 * - Personalização das páginas de autenticação.
 * - Manipulação de eventos e callbacks de autenticação, como login, sessão e JWT.
 *
 * @module Authentication
 */

/**
 * Configuração e exportação do NextAuth com as páginas personalizadas, adaptador Prisma,
 * e os callbacks necessários para os processos de autenticação.
 *
 * @constant
 * @type {Object}
 * @property {Function} GET - Handler para a requisição GET (usado para login, etc.).
 * @property {Function} POST - Handler para a requisição POST (usado para criação de sessão, etc.).
 * @property {Object} auth - Configuração de autenticação do NextAuth.
 * @property {Function} signIn - Função para iniciar a autenticação do usuário.
 * @property {Function} signOut - Função para finalizar a autenticação do usuário.
 */
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  /**
   * Define as páginas personalizadas de autenticação, como páginas de login, erro, etc.
   *
   * @see authPages
   */
  pages: {
    signIn: '/auth/login',
    signOut: 'auth/logout',
  },

  /**
   * Define os eventos que serão disparados durante o processo de autenticação, como
   * o evento de vinculação de conta.
   *
   * @see linkAccountEvent
   */
  events: { linkAccount: linkAccountEvent },

  /**
   * Configuração dos callbacks que manipulam eventos específicos durante a autenticação.
   *
   * - **signIn**: Callback executado após o login do usuário.
   * - **session**: Callback executado para gerar uma sessão do usuário.
   * - **jwt**: Callback para manipular o token JWT.
   *
   * @see signInCallback
   * @see sessionCallback
   * @see jwtCallback
   */
  callbacks: {
    signIn: signInCallback,
    session: sessionCallback,
    jwt: jwtCallback,
  },

  /**
   * Utiliza o PrismaAdapter para persistir dados de autenticação no banco de dados,
   * garantindo a integração com o banco de dados utilizando o cliente Prisma.
   *
   * @see PrismaAdapter
   * @see prismaClient
   */
  adapter: PrismaAdapter(prismaClient),

  /**
   * Define a estratégia de sessão a ser utilizada, no caso, a estratégia "jwt" é usada
   * para armazenar a sessão no próprio token JWT.
   *
   * @type {Object}
   * @property {string} strategy - A estratégia de armazenamento da sessão.
   */
  session: { strategy: 'jwt' },

  /**
   * Configurações adicionais de autenticação (como regras de validação de usuários,
   * configurações de segurança, etc.) são aplicadas a partir do arquivo de configuração
   * `authConfig`.
   *
   * @see authConfig
   */
  ...authConfig,
});
