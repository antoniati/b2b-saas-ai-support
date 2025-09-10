import {
  TenantRepository,
  TenantRequestContext,
  extractSlugFromDomain,
} from "@/features/tenants";

import {
  auth,
  apiAuthPrefix,
  authRoutes,
  handleAuthRoute,
  handlePrivateRoute,
  publicRoutes,
  shouldBypassAuth,
} from "@/features/auth";

/**
 * Middleware de autenticação
 */
export default auth(async (req: any) => {
  const pathname = req.nextUrl.pathname; // URL da requisição, sem domínio
  const hostname = req.nextUrl.hostname; // Domínio da requisição, sem prcotocolo
  const session = req.auth; // Sessão da requisição, contendo os dados do usuário

  const isLoggedIn = !!session; // Verifica se o usuário está logado
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix); // Verifica se a rota é de autenticação da API
  const isPublicRoute = publicRoutes.includes(pathname); // Verifica se a rota é pública
  const isAuthRoute = authRoutes.includes(pathname); // Verifica se a rota é de autenticação

  // Extrair os dados do tenant da sessão
  let tenantId = session?.user?.tenantId || null;
  const userId = session?.user?.id || null;

  // Se não houver tenant na sessão, buscar pelo domínio
  if (!tenantId) {
    const slug = extractSlugFromDomain(hostname); // Extrair o slug do domínio

    // Se houver slug, buscar o tenant
    if (slug) {
      try {
        const tenant = await TenantRepository.findBySlug(slug);
        tenantId = tenant?.id; // Definir o tenantId
      } catch (error) {
        console.error("Erro ao buscar tenant por slug:", error);
      }
    }
  }

  // Criar contexto da requisição
  const context = { tenantId, userId };

  return TenantRequestContext.run(context, () => {
    try {
      if (shouldBypassAuth(pathname)) return; // Verifica se a rota deve ignorar a autenticação
      if (isApiAuthRoute) return; // Verifica se a rota é de autenticação da API
      if (isPublicRoute) return; // Verifica se a rota é pública
      if (isAuthRoute) return handleAuthRoute(req, isLoggedIn); // Verifica se a rota é de autenticação
      if (!isLoggedIn) return handlePrivateRoute(req, req.nextUrl); // Verifica se o usuário está logado
    } catch {
      return;
    }
  });
});

// Exporta aConfiguração do middleware
export const config = {
  // Matcher para o middleware, definindo quais rotas ele deve ser executado
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
