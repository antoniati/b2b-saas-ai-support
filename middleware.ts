import { auth } from '@/features/users/auth/auth';

import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/features/users/auth/config/routes.config';
import { shouldBypassAuth } from '@/features/users/auth/utils/ignore.routes';
import { handlePrivateRoute } from '@/features/users/auth/utils/private.routes';
import { handleAuthRoute } from '@/features/users/auth/utils/auth.routes';

/**
 * Middleware de autenticação
 */
export default auth((req: any) => {
  const isLoggedIn = !!req.auth; // Verifica se o usuário está logado
  const pathname = req.nextUrl.pathname; // Obtem o caminho da URL

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix); // Verifica se a rota é de autenticação
  const isPublicRoute = publicRoutes.includes(pathname); // Verifica se a rota é pública
  const isAuthRoute = authRoutes.includes(pathname); // Verifica se a rota é de autenticação

  try {
    // Verifica se a rota precisa ser protegida
    if (shouldBypassAuth(pathname)) {
      return;
    }

    // Permitir rotas de API de autenticação
    if (isApiAuthRoute) {
      return;
    }

    // Permitir rotas públicas como "/carrinho"
    if (isPublicRoute) {
      return;
    }

    // Verifica se a rota é de autenticação e se o usuário está logado
    if (isAuthRoute) {
      return handleAuthRoute(req, isLoggedIn);
    }

    // Se não está logado e a rota não é pública, redirecionar para login
    if (!isLoggedIn) {
      return handlePrivateRoute(req, req.nextUrl);
    }
  } catch {
    // Para rotas inexistentes, o Next.js renderiza a página 404
    return;
  }

  return;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'], // Define quais rotas devem ser tratadas pelo middleware
};
