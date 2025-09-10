import { getPrisma } from "@/shared/lib/prisma";

import { UserRepository } from "@/features/users/repository/users-repo";
import { TenantRequestContext } from "@/features/tenants/contexts/tenants-context";
import {
  setupDatabase,
  teardownDatabase,
  resetDatabase,
} from "@/__tests__/__setup__/setup-database";
import { setupSchema } from "@/__tests__/__setup__/helpers/schema";
import { withTenant } from "@/__tests__/__setup__/helpers/tenant-helper";
import { ForbiddenError, UnauthorizedError } from "@/shared";

const prismaClient = getPrisma();

jest.setTimeout(12000);

describe("UserRepository - Integração com RLS", () => {
  beforeAll(async () => {
    await setupDatabase();
    await setupSchema(prismaClient);
  });

  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await teardownDatabase();
  });

  const mockUserA = {
    id: "user-a",
    email: "a@example.com",
    name: "User A",
    tenantId: "tenant-a",
    password: "password123#",
  };

  const mockUserB = {
    id: "user-b",
    email: "b@example.com",
    name: "User B",
    tenantId: "tenant-b",
    password: "password123!",
  };

  describe("findByEmail", () => {
    it("permite acesso quando tenantId bate", async () => {
      (TenantRequestContext.get as jest.Mock).mockReturnValue({
        tenantId: mockUserA.tenantId,
        userId: mockUserA.id,
      });

      await prismaClient.user.create({ data: mockUserA });

      await withTenant(mockUserA.tenantId, async () => {
        const user = await UserRepository.findByEmail(mockUserA.email);
        expect(user).toMatchObject(mockUserA);
      });
    });

    it("lança ForbiddenError quando tenantId não bate", async () => {
      (TenantRequestContext.get as jest.Mock).mockReturnValue({
        tenantId: "tenant-x",
        userId: "user-x",
      });

      await prismaClient.user.create({ data: mockUserA });

      await withTenant("tenant-x", async () => {
        await expect(
          UserRepository.findByEmail(mockUserA.email),
        ).rejects.toThrow(ForbiddenError);
      });
    });
  });

  describe("findById", () => {
    it("permite acesso quando tenantId bate", async () => {
      (TenantRequestContext.get as jest.Mock).mockReturnValue({
        tenantId: mockUserA.tenantId,
        userId: mockUserA.id,
      });

      await prismaClient.user.create({ data: mockUserA });

      await withTenant(mockUserA.tenantId, async () => {
        const user = await UserRepository.findById(mockUserA.id);
        expect(user).toMatchObject(mockUserA);
      });
    });

    it("lança UnauthorizedError se tenantId do contexto for null", async () => {
      (TenantRequestContext.get as jest.Mock).mockReturnValue({
        tenantId: null,
        userId: null,
      });

      await prismaClient.user.create({ data: mockUserA });

      await expect(UserRepository.findById(mockUserA.id)).rejects.toThrow(
        UnauthorizedError,
      );
    });

    it("lança ForbiddenError se tenantId do contexto não bate", async () => {
      (TenantRequestContext.get as jest.Mock).mockReturnValue({
        tenantId: "tenant-x",
        userId: "user-x",
      });

      await prismaClient.user.create({ data: mockUserA });

      await withTenant("tenant-x", async () => {
        await expect(UserRepository.findById(mockUserA.id)).rejects.toThrow(
          ForbiddenError,
        );
      });
    });
  });

  describe("createUser", () => {
    it("cria usuário respeitando RLS", async () => {
      (TenantRequestContext.get as jest.Mock).mockReturnValue({
        tenantId: mockUserA.tenantId,
        userId: mockUserA.id,
      });

      await withTenant(mockUserA.tenantId, async () => {
        const created = await prismaClient.user.create({ data: mockUserA });
        expect(created.id).toBe(mockUserA.id);
        expect(created.tenantId).toBe(mockUserA.tenantId);
      });
    });

    it("falha ao criar usuário com tenant diferente (RLS)", async () => {
      (TenantRequestContext.get as jest.Mock).mockReturnValue({
        tenantId: "tenant-x",
        userId: "user-x",
      });

      await withTenant("tenant-x", async () => {
        await expect(
          prismaClient.user.create({ data: mockUserB }),
        ).rejects.toThrow();
      });
    });
  });
});
