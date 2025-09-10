import { auth } from "@/features/auth/auth";
import { UserAction } from "@/features/users/server-actions/users-action";
import { TenantService } from "@/features/tenants/services/tenants-service";
import { PasswordService } from "@/shared/services/password-service";
import { UserService } from "@/features/users/services/users-service";
import { TokenService } from "@/features/tokens/services/tokens-service";
import { EmailService } from "@/features/emails/services/emails-service";

describe("UserAction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =========================
  // getCurrentUser
  // =========================
  describe("getCurrentUser", () => {
    it("deve retornar o usuário atual quando logado", async () => {
      const user = { ...global.userA };
      (auth as jest.Mock).mockResolvedValue({ user });

      const result = await UserAction.getCurrentUser();
      expect(result).toEqual(user);
    });

    it("deve retornar undefined quando não há usuário logado", async () => {
      (auth as jest.Mock).mockResolvedValue(null);

      const result = await UserAction.getCurrentUser();
      expect(result).toBeUndefined();
    });
  });

  // =========================
  // inviteUser
  // =========================
  describe("inviteUser", () => {
    it("deve criar usuário, gerar token e enviar convite", async () => {
      const tenant = {
        id: global.tenantA.id,
        name: global.tenantA.name,
        slug: global.tenantA.slug,
      };
      const user = {
        id: global.userA.id,
        name: global.userA.name,
        email: global.userA.email,
        password: global.userA.password,
        role: global.userA.role,
        status: global.userA.status,
      };
      const token = { token: "token-123" };
      const tempPassword = "user-123";

      (TenantService.checkTenantInContext as jest.Mock).mockResolvedValue(
        tenant,
      );
      (PasswordService.generateStrongPassword as jest.Mock).mockReturnValue(
        tempPassword,
      );
      (UserService.create as jest.Mock).mockResolvedValue(user);
      (TokenService.generate as jest.Mock).mockResolvedValue(token);
      (EmailService.sendInvitationLink as jest.Mock).mockResolvedValue(
        undefined,
      );
      const result = await UserAction.inviteUser(user);

      expect(TenantService.checkTenantInContext).toHaveBeenCalled();
      expect(PasswordService.generateStrongPassword).toHaveBeenCalled();
      expect(UserService.create).toHaveBeenCalledWith({ ...user }, tenant.id);
      expect(TokenService.generate).toHaveBeenCalledWith(
        user.email,
        "INVITATION",
      );
      expect(EmailService.sendInvitationLink).toHaveBeenCalledWith(
        user.email,
        token.token,
        user.password,
        user.role,
        tenant.name,
      );
      expect(result).toEqual({
        ok: true,
        status: 200,
        message: "Operação realizada com sucesso.",
        data: { email: global.userA.email },
      });
    });
  });

  // =========================
  // updatePersonalData
  // =========================
  describe("updatePersonalData", () => {
    it("deve atualizar dados pessoais e retornar e-mail e nome", async () => {
      const updatedUser = {
        email: global.userA.email,
        name: global.userA.name,
      };

      (UserService.updatePersonalData as jest.Mock).mockResolvedValue(
        updatedUser,
      );

      const values = { email: global.userA.email, name: "Updated Name" };
      const result = await UserAction.updatePersonalData(
        values,
        global.userA.id,
      );

      expect(UserService.updatePersonalData).toHaveBeenCalledWith(
        global.userA.id,
        values.email,
        values.name,
      );
      expect(result).toEqual({
        ok: true,
        status: 200,
        message: "Operação realizada com sucesso.",
        data: updatedUser,
      });
    });
  });

  // =========================
  // updateTwoFactorEnabled
  // =========================
  describe("updateTwoFactorEnabled", () => {
    it("deve atualizar a flag de 2FA e retornar a flag atualizada", async () => {
      (UserService.updateTwoFactor as jest.Mock).mockResolvedValue(undefined);

      const values = { isTwoFactorEnabled: true };
      const result = await UserAction.updateTwoFactorEnabled(
        values,
        global.userA.id,
      );

      expect(UserService.updateTwoFactor).toHaveBeenCalledWith(
        global.userA.id,
        true,
      );
      expect(result).toEqual({
        ok: true,
        status: 200,
        message: "Operação realizada com sucesso.",
        data: { isTwoFactorEnabled: true },
      });
    });
  });
});
