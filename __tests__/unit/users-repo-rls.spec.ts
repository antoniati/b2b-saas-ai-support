import { getPrisma } from "@/shared/lib/prisma";
import { UserRepository } from "@/features/users/repository/users-repo";
import { ForbiddenError, UnauthorizedError } from "@/shared";
import { TenantRequestContext } from "@/features/tenants/contexts/tenants-context";

describe("Row-Level Security (RLS) - UserRepository", () => {
  const prismaMock = getPrisma();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = {
    id: global.userA.id,
    email: global.userA.email,
    name: global.userA.name,
    tenantId: global.userA.tenantId,
    role: global.userA.role,
    status: global.userA.status,
    isTwoFactorEnabled: false,
    isEmailVerified: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe("findByEmail", () => {
    it("permite acesso quando tenantId do contexto é igual ao do usuário", async () => {
      (TenantRequestContext.get as jest.Mock).mockReturnValue({
        tenantId: mockUser.tenantId,
        userId: mockUser.id,
      });

      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await UserRepository.findByEmail(mockUser.email);

      expect(result).toMatchObject(mockUser);
      expect(prismaMock.user.findUnique).toHaveBeenCalled();
    });

    it("lança ForbiddenError quando tenantId não bate", async () => {
      (TenantRequestContext.get as jest.Mock).mockReturnValue({
        tenantId: "tenant-b",
        userId: "user-b",
      });

      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await expect(UserRepository.findByEmail(mockUser.email)).rejects.toThrow(
        ForbiddenError,
      );
    });
  });

  describe("findById", () => {
    it("permite acesso quando tenantId é o mesmo", async () => {
      (TenantRequestContext.get as jest.Mock).mockReturnValue({
        tenantId: mockUser.tenantId,
        userId: mockUser.id,
      });

      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await UserRepository.findById(mockUser.id);

      expect(result).toMatchObject(mockUser);
    });

    it("lança UnauthorizedError se contexto não tiver tenantId", async () => {
      (TenantRequestContext.get as jest.Mock).mockReturnValue({
        tenantId: null,
        userId: null,
      });

      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await expect(UserRepository.findById(mockUser.id)).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
