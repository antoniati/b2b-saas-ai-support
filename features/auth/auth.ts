import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prismaClient } from '@/shared/lib/prisma';

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
export const authOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        console.log('Placeholder authorize', credentials?.email);
        return { id: 'placeholder-id', email: credentials?.email };
      },
    }),
  ],
  callbacks: {
    signIn: async (user: any) => {
      console.log('Placeholder signIn callback', user);
      return true;
    },
    session: async ({ session }: { session: any }) => {
      console.log('Placeholder session callback', session);
      return session;
    },
    jwt: async ({ token }: { token: any }) => {
      console.log('Placeholder JWT callback', token);
      return token;
    },
  },
  session: { strategy: 'jwt' as const },
  pages: { signIn: '/auth/signin' },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
