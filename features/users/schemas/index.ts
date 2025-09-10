// Importa z de zod para validação de schema
import { z } from "zod";

// Importa constantes de mensagens de erro
import { ERROR_MESSAGES } from "@/shared";

// Schema de validação de login
export const LoginSchema = z.object({
  email: z.email({ message: ERROR_MESSAGES.REQUIRED_FIELD }),
  password: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED_FIELD }),
  code: z.string().optional(),
});

// Schema de validação de criação de usuário
export const CreateUserSchema = z.object({
  name: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED_FIELD }),
  email: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED_FIELD }),
  role: z.enum(["USER", "ADMIN", "AGENT"]).default("USER"),
  status: z.enum(["PENDING", "ACTIVE", "INACTIVE"]).default("PENDING"),
});

// Schema de validação para confirmar completar o cadastro
export const CompleteRegistrationSchema = z.object({
  password: z.string().min(6, { message: ERROR_MESSAGES.WEAK_PASSWORD }),
});

// Schema de validação de recuperação de senha
export const PasswordRecoverSchema = z.object({
  email: z.email({ message: ERROR_MESSAGES.REQUIRED_FIELD }),
});

// Schema de validação de redefinição de senha
export const PasswordResetSchema = z.object({
  password: z.string().min(6, { message: ERROR_MESSAGES.WEAK_PASSWORD }),
});

// Schema de validação de atualização de two-factor
export const DataSecuritySchema = z.object({
  isTwoFactorEnabled: z.boolean().default(false),
});

// Schema de validação de atualização de dados de usuário
export const PersonalDataSchema = z.object({
  name: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED_FIELD }),
  email: z.email({ message: ERROR_MESSAGES.REQUIRED_FIELD }),
});
