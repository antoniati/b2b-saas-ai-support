import {
  DomainError,
  ERROR_MESSAGES,
  mapPrismaError,
  validateSchema,
} from "@/shared";
import {
  type UserData,
  type UserFormValues,
  UserRepository,
  CreateUserSchema,
  PersonalDataSchema,
  DataSecuritySchema,
} from "@/features/users";
import { TokenService } from "@/features/tokens";
import { EmailService } from "@/features/emails";
import { getRequestTenantId } from "@/features/tenants";

export const UserService = {
  /**
   * Cria um novo usuário.
   */
  async create(
    values: UserFormValues,
    tenantId: string,
  ): Promise<Pick<UserData, "email" | "id">> {
    // 1. Valida os dados do formulário
    const validatedFiedls = validateSchema(CreateUserSchema, values);

    // 2. Extrai os dados parseados e validados para criar o usuário
    const { email, name, role, status = "PENDING" } = validatedFiedls;

    // 3. Verifica se o e-mail ja existe no tenant, caso positivo, lança erro
    const existingUser = await UserService.getByEmail(email);
    if (existingUser)
      throw new DomainError(ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED, 400);

    // 4. Cria o usuário, vinculando-o ao tenant
    try {
      const userCreated = await UserRepository.create({
        name,
        email,
        password: values.password,
        role,
        status,
        tenantId,
      });

      return { email: userCreated.email, id: userCreated.id };
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Busca usuário por ID.
   */
  async getById(userId: string): Promise<UserData | null> {
    try {
      return await UserRepository.findById(userId); // valida tenant internamente
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Busca usuário por e-mail.
   */
  /**
   * Busca usuário por email dentro do tenant atual.
   */
  async getByEmail(email: string): Promise<UserData | null> {
    const tenantId = getRequestTenantId();
    if (!tenantId) throw new DomainError("Tenant não encontrado", 400);

    try {
      return await UserRepository.findByEmailAndTenantId(email, tenantId);
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Atualiza a senha do usuário dentro do tenant atual.
   */
  async updatePassword(
    email: string,
    password: string,
  ): Promise<UserData | null> {
    const tenantId = getRequestTenantId();
    if (!tenantId) throw new DomainError("Tenant não encontrado", 400);

    const user = await UserRepository.findByEmailAndTenantId(email, tenantId);
    if (!user) throw new DomainError(ERROR_MESSAGES.USER_NOT_FOUND, 404);

    try {
      return await UserRepository.updatePassword(email, password);
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Atualiza dados pessoais (nome e e-mail) dentro do tenant atual.
   */
  async updatePersonalData(
    id: string,
    email: string,
    name: string,
  ): Promise<UserData | null> {
    // 1. Valida os dados
    const validatedFiedls = validateSchema(PersonalDataSchema, {
      values: { email, name },
    });

    // 2. Extrai os dados parseados e validados
    const { email: newEmail, name: newName } = validatedFiedls;

    // 3. Verifica se o usuario existe
    const userFound = await UserRepository.findById(id);
    if (!userFound) throw new DomainError(ERROR_MESSAGES.USER_NOT_FOUND, 404);

    // 4. Verifica se houve alteração
    if (userFound.email === newEmail && userFound.name === newName)
      throw new DomainError(ERROR_MESSAGES.NO_CHANGES_DETECTED, 400);

    // 5. Atualiza os dados
    try {
      const result = await UserRepository.updatePersonalData({
        id,
        email: newEmail,
        name: newName,
      });

      return result;
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Habilita/desabilita autenticação de dois fatores no tenant atual.
   */
  async updateTwoFactor(
    id: string,
    isEnabled: boolean,
  ): Promise<UserData | null> {
    // 1. Valida os dados
    const validatedFiedls = validateSchema(DataSecuritySchema, isEnabled);

    // 2. Verifica se o usuario existe
    const user = await UserRepository.findById(id);
    if (!user) throw new DomainError(ERROR_MESSAGES.USER_NOT_FOUND, 404);

    // 3. Atualiza os dados com os valores validados
    try {
      const result = await UserRepository.updateTwoFactor(
        id,
        validatedFiedls.isTwoFactorEnabled,
      );

      return result;
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Atualiza data de verificação de e-mail no tenant atual.
   */
  async updateVerificationDate(email: string): Promise<UserData | null> {
    const tenantId = getRequestTenantId();
    if (!tenantId) throw new DomainError("Tenant não encontrado", 400);

    const user = await UserRepository.findByEmailAndTenantId(email, tenantId);
    if (!user) throw new DomainError(ERROR_MESSAGES.USER_NOT_FOUND, 404);

    try {
      return await UserRepository.updateEmailVerificationDate(email);
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Verifica se a conta foi confirmada e envia novo token se necessário.
   */
  async verifyAccountConfirmed(
    email: string,
    createdAt: Date,
  ): Promise<{ token?: string }> {
    const tenantId = getRequestTenantId();
    if (!tenantId) throw new DomainError("Tenant não encontrado", 400);

    const user = await UserRepository.findByEmailAndTenantId(email, tenantId);
    if (!user) throw new DomainError(ERROR_MESSAGES.USER_NOT_FOUND, 404);

    const elapsed = Date.now() - new Date(createdAt).getTime();
    const ONE_HOUR = 60 * 60 * 1000;

    if (elapsed >= ONE_HOUR) {
      const token = await TokenService.generate(email, "EMAIL_VERIFICATION");
      await EmailService.sendVerificationLink(email, token.token, "");
      return { token: token.token };
    }

    throw new DomainError(ERROR_MESSAGES.EMAIL_NOT_VERIFIED, 400);
  },
};
