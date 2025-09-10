jest.mock("@/features/auth/auth", () => ({
  auth: (fn: any) => fn,
}));

jest.mock("@/features/tenants/repository/tenants-repo", () => ({
  TenantRepository: {
    findBySlug: jest.fn(),
    findByDomain: jest.fn(),
  },
}));

import middleware from "@/middleware";
import { createMockRequestAndContext } from "@/__tests__/setup/helpers/create-mock-request";
import { shouldBypassAuth } from "@/features/auth/utils/ignore-routes";
import { extractSlugFromDomain } from "@/features/tenants/utils/tenants-domain-utils";
import { TenantRepository } from "@/features/tenants/repository/tenants-repo";
import { TenantRequestContext } from "@/features/tenants/contexts/tenants-context";
import { handleAuthRoute } from "@/features/auth/utils/auth-routes";
import { handlePrivateRoute } from "@/features/auth/utils/private-routes";

describe("Middleware", () => {
  const context = {};

  const baseRequest = {
    auth: { user: { id: global.userA.id, tenantId: global.userA.tenantId } },
    nextUrl: { pathname: "/dashboard", hostname: "tenant-a.localhost" },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Configura mocks
    (shouldBypassAuth as jest.Mock).mockReturnValue(false);
    (extractSlugFromDomain as jest.Mock).mockReturnValue(global.tenantA.slug);
    (TenantRepository.findBySlug as jest.Mock).mockResolvedValue({
      id: global.tenantA.id,
      slug: global.tenantA.slug,
    });
    // Mock do TenantRequestContext.run para capturar o payload
    jest
      .spyOn(TenantRequestContext, "run")
      .mockImplementation(async (context, fn) => {
        return fn();
      });
  });

  it("usa tenant da sessão quando disponível e não chama domínio", async () => {
    await middleware(baseRequest as any, context as any);

    expect(TenantRequestContext.run).toHaveBeenCalledWith(
      { tenantId: global.userA.tenantId, userId: global.userA.id },
      expect.any(Function),
    );
    expect(extractSlugFromDomain).not.toHaveBeenCalled();
    expect(TenantRepository.findBySlug).not.toHaveBeenCalled();
  });

  it("consulta domínio quando não há tenant na sessão", async () => {
    const req = { ...baseRequest, auth: null };

    await middleware(req as any, context as any);

    expect(extractSlugFromDomain).toHaveBeenCalledWith("tenant-a.localhost");
    expect(TenantRepository.findBySlug).toHaveBeenCalledWith(
      global.tenantA.slug,
    );
    expect(TenantRequestContext.run).toHaveBeenCalledWith(
      { tenantId: global.tenantA.id, userId: null },
      expect.any(Function),
    );
  });

  it("usa null quando não há tenant na sessão nem no domínio", async () => {
    (extractSlugFromDomain as jest.Mock).mockReturnValue(null);
    (TenantRepository.findBySlug as jest.Mock).mockResolvedValue(null);

    const req = { ...baseRequest, auth: null };
    await middleware(req as any, context as any);

    expect(TenantRequestContext.run).toHaveBeenCalledWith(
      { tenantId: null, userId: null },
      expect.any(Function),
    );
  });

  it("ignora autenticação quando rota deve ser ignorada", async () => {
    (shouldBypassAuth as jest.Mock).mockReturnValue(true);
    await middleware(baseRequest as any, context as any);

    expect(shouldBypassAuth).toHaveBeenCalledWith("/dashboard");
    expect(handleAuthRoute).not.toHaveBeenCalled();
    expect(handlePrivateRoute).not.toHaveBeenCalled();
  });

  it("chama handleAuthRoute quando rota é de auth", async () => {
    const [req, mockContext] = createMockRequestAndContext({
      pathname: "/auth/login",
      hostname: "tenant-a.localhost",
      auth: baseRequest.auth,
    });

    await middleware(req, mockContext);
    expect(handleAuthRoute).toHaveBeenCalledWith(req, true);
  });

  it("chama handlePrivateRoute quando usuário não está logado", async () => {
    const [req, mockContext] = createMockRequestAndContext({
      pathname: "/dashboard",
      hostname: "tenant-a.localhost",
      auth: null,
    });

    await middleware(req, mockContext);
    expect(handlePrivateRoute).toHaveBeenCalledWith(req, req.nextUrl);
  });
});
