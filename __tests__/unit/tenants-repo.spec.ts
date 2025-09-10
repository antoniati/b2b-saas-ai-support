import prismaMock from "@/__tests__/mocks/prisma-mock";
import { ForbiddenError, UnauthorizedError } from "@/shared";
import { TenantRequestContext } from "@/features/tenants/contexts/tenants-context";
import { ensureTenantAccess, TenantRepository } from "@/features/tenants";

describe("TenantRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("deve criar tenant com os dados corretos e active=false", async () => {
      const values = { name: "Acme S.A.", slug: "acme", planId: "plan_free" };
      const expected = { id: "t_123", name: values.name, slug: values.slug };

      (prismaMock.tenant.create as jest.Mock).mockResolvedValue(expected);

      const result = await TenantRepository.create(values);

      expect(prismaMock.tenant.create).toHaveBeenCalledWith({
        data: {
          name: values.name,
          slug: values.slug,
          planId: values.planId,
          active: false,
        },
        select: { id: true, name: true, slug: true },
      });

      expect(result).toEqual(expected);
    });

    it("deve propagar erro do prisma quando falhar", async () => {
      const values = { name: "Erro Ltda", slug: "erro", planId: "plan_pro" };
      const dbError = new Error("db down");

      (prismaMock.tenant.create as jest.Mock).mockRejectedValue(dbError);

      await expect(TenantRepository.create(values)).rejects.toThrow("db down");
    });
  });

  describe("findById", () => {
    it("permite pesquisar quando tenantId é o mesmo", async () => {
      (TenantRequestContext.get as jest.Mock).mockReturnValue({
        tenantId: global.userA.tenantId,
        userId: global.userA.id,
      });

      (prismaMock.tenant.findUnique as jest.Mock).mockResolvedValue(
        global.tenantA,
      );

      const result = await TenantRepository.findById(global.tenantA.id);

      expect(result).toMatchObject(global.tenantA);
    });

    it("lança ForbiddenError se tenant encontrado for diferente do tenantId do contexto", async () => {
      (TenantRequestContext.get as jest.Mock).mockReturnValue({
        tenantId: "tenant_diferente",
        userId: global.userA.id,
      });

      (prismaMock.tenant.findUnique as jest.Mock).mockResolvedValue(
        global.tenantA,
      );

      await expect(
        TenantRepository.findById(global.tenantA.id),
      ).rejects.toThrow(ForbiddenError);
    });

    it("lança UnauthorizedError se contexto não tiver tenantId", async () => {
      (TenantRequestContext.get as jest.Mock).mockReturnValue({
        tenantId: null,
        userId: null,
      });

      (prismaMock.tenant.findUnique as jest.Mock).mockResolvedValue(
        global.tenantA,
      );

      await expect(
        TenantRepository.findById(global.tenantA.id),
      ).rejects.toThrow(UnauthorizedError);
    });
  });

  describe("findBySlug", () => {
    it("retorna tenant quando slug existe e acesso permitido", async () => {
      (prismaMock.tenant.findFirst as jest.Mock).mockResolvedValue(
        global.tenantA,
      );
      (ensureTenantAccess as jest.Mock).mockReturnValue(undefined);

      const result = await TenantRepository.findBySlug(global.tenantA.slug);

      expect(prismaMock.tenant.findFirst).toHaveBeenCalledWith({
        where: { slug: global.tenantA.slug },
      });
      expect(ensureTenantAccess).toHaveBeenCalledWith(global.tenantA.id);
      expect(result).toEqual(global.tenantA);
    });

    it("retorna null quando slug não existe", async () => {
      (prismaMock.tenant.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await TenantRepository.findBySlug("inexistente");

      expect(result).toBeNull();
      expect(ensureTenantAccess).not.toHaveBeenCalled();
    });

    it("lança ForbiddenError quando slug existe mas tenantId do contexto é diferente", async () => {
      (prismaMock.tenant.findFirst as jest.Mock).mockResolvedValue(
        global.tenantA,
      );
      (ensureTenantAccess as jest.Mock).mockImplementation(() => {
        throw new ForbiddenError();
      });

      await expect(
        TenantRepository.findBySlug(global.tenantA.slug),
      ).rejects.toThrow(ForbiddenError);
    });
  });

  describe("findByDomain", () => {
    it("retorna tenant quando domain existe e acesso permitido", async () => {
      (prismaMock.tenant.findFirst as jest.Mock).mockResolvedValue(
        global.tenantA,
      );
      (ensureTenantAccess as jest.Mock).mockReturnValue(undefined);

      const result = await TenantRepository.findByDomain(global.tenantA.domain);

      expect(prismaMock.tenant.findFirst).toHaveBeenCalledWith({
        where: { domain: global.tenantA.domain },
      });
      expect(ensureTenantAccess).toHaveBeenCalledWith(global.tenantA.id);
      expect(result).toEqual(global.tenantA);
    });

    it("retorna null quando domain não existe", async () => {
      (prismaMock.tenant.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await TenantRepository.findByDomain("inexistente.com");

      expect(result).toBeNull();
      expect(ensureTenantAccess).not.toHaveBeenCalled();
    });

    it("lança ForbiddenError quando domain existe mas tenantId do contexto é diferente", async () => {
      (prismaMock.tenant.findFirst as jest.Mock).mockResolvedValue(
        global.tenantA,
      );
      (ensureTenantAccess as jest.Mock).mockImplementation(() => {
        throw new ForbiddenError();
      });

      await expect(
        TenantRepository.findByDomain(global.tenantA.domain),
      ).rejects.toThrow(ForbiddenError);
    });
  });
});
