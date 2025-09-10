import { Role, UserStatus } from "@prisma/client";
import { TenantService } from "@/features/tenants/services/tenants-service";
import { PasswordService } from "@/shared/services/password-service";
import { UserService } from "@/features/users/services/users-service";
import { TokenService } from "@/features/tokens/services/tokens-service";
import { EmailService } from "@/features/emails/services/emails-service";
import { TenantAction } from "@/features/tenants/server-actions/tenants-action";

describe("TenantAction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("deve criar tenant, usuário, token e enviar email", async () => {
      //
      const tenantCreated = { ...global.tenantA };
      const userCreated = { ...global.userA };
      const token = { token: "token-123" };
      const password = "temp-pass";

      // Mock do serviço
      (TenantService.create as jest.Mock).mockResolvedValue(tenantCreated);
      (PasswordService.generateStrongPassword as jest.Mock).mockReturnValue(
        password,
      );
      (UserService.create as jest.Mock).mockResolvedValue(userCreated);
      (TokenService.generate as jest.Mock).mockResolvedValue(token);
      (EmailService.sendVerificationLink as jest.Mock).mockResolvedValue(
        undefined,
      );

      // Executa a action
      const result = await TenantAction.create(
        {
          name: global.tenantA.name,
          slug: global.tenantA.slug,
          planId: global.tenantA.planId,
        },
        global.userA.email,
      );

      // Verifica chamadas
      expect(TenantService.create).toHaveBeenCalledWith({
        name: global.tenantA.name,
        slug: global.tenantA.slug,
        planId: global.tenantA.planId,
      });
      expect(PasswordService.generateStrongPassword).toHaveBeenCalled();
      expect(UserService.create).toHaveBeenCalledWith(
        {
          email: global.userA.email,
          name: global.tenantA.name,
          password,
          role: "OWNER" as Role,
          status: "PENDING" as UserStatus,
        },
        tenantCreated.id,
      );
      expect(TokenService.generate).toHaveBeenCalledWith(
        global.userA.email,
        "EMAIL_VERIFICATION",
      );
      expect(EmailService.sendVerificationLink).toHaveBeenCalledWith(
        global.userA.email,
        token.token,
        tenantCreated.name,
      );

      expect(result).toEqual({
        ok: true,
        status: 200,
        message: "Operação realizada com sucesso.",
        data: { email: global.userA.email },
      });
    });
  });

  describe("update", () => {
    it("deve atualizar um tenant e retornar o tenant atualizado", async () => {
      const tenantUpdated = { ...global.tenantA, name: "Tenant A Updated" };

      // Mock do serviço
      (TenantService.update as jest.Mock).mockResolvedValue(tenantUpdated);

      // Executa a action
      const result = await TenantAction.update(global.tenantA.id, {
        name: "Tenant A Updated",
      });

      // Verifica se o serviço foi chamado corretamente
      expect(TenantService.update).toHaveBeenCalledWith(global.tenantA.id, {
        name: "Tenant A Updated",
      });

      // Verifica se o retorno está correto (lembrando que handleAction envolve o retorno em data/message/ok/status)
      expect(result).toEqual({
        ok: true,
        status: 200,
        message: "Operação realizada com sucesso.",
        data: tenantUpdated,
      });
    });
  });

  describe("getById", () => {
    it("deve retornar o tenant pelo ID", async () => {
      const tenant = { ...global.tenantA };
      (TenantService.getById as jest.Mock).mockResolvedValue(tenant);

      const result = await TenantAction.getById(tenant.id);

      expect(TenantService.getById).toHaveBeenCalledWith(tenant.id);
      expect(result).toEqual({
        ok: true,
        status: 200,
        message: "Operação realizada com sucesso.",
        data: tenant,
      });
    });
  });

  describe("getBySlug", () => {
    it("deve retornar o tenant pelo slug", async () => {
      const tenant = { ...global.tenantA };
      (TenantService.getBySlug as jest.Mock).mockResolvedValue(tenant);

      const result = await TenantAction.getBySlug(tenant.slug);

      expect(TenantService.getBySlug).toHaveBeenCalledWith(tenant.slug);
      expect(result).toEqual({
        ok: true,
        status: 200,
        message: "Operação realizada com sucesso.",
        data: tenant,
      });
    });
  });

  describe("delete", () => {
    it("deve deletar o tenant", async () => {
      const tenantId = global.tenantA.id;
      (TenantService.delete as jest.Mock).mockResolvedValue(undefined);

      const result = await TenantAction.delete(tenantId);

      expect(TenantService.delete).toHaveBeenCalledWith(tenantId);
      expect(result).toEqual({
        ok: true,
        status: 200,
        message: "Operação realizada com sucesso.",
      });
    });
  });
});
