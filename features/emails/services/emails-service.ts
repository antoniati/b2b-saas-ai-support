import { DomainError } from "@/shared";
import { ERROR_MESSAGES, sendEmail } from "@/features/emails";

import {
  verificationTemplate,
  resetPasswordTemplate,
  twoFactorTemplate,
  invitationTemplate,
} from "@/features/emails";

/**
 * Serviços de envio de emails
 */
export const EmailService = {
  /**
   * Envia email de confirmação de conta com link de confirmação.
   */
  async sendVerificationLink(email: string, token: string, tenantName: string) {
    if (!token)
      throw new DomainError(ERROR_MESSAGES.EMAIL_TOKEN_REQUIRED, 400, {
        token: ERROR_MESSAGES.EMAIL_TOKEN_REQUIRED,
      });
    if (!tenantName)
      throw new DomainError(ERROR_MESSAGES.TENANT_NAME_REQUIRED, 400, {
        tenantName: ERROR_MESSAGES.TENANT_NAME_REQUIRED,
      });

    return sendEmail({
      to: email,
      subject: "Confirmação de Conta - B2B Support AI",
      htmlContent: verificationTemplate(token, tenantName),
    });
  },

  /**
   * Envia email de redefinição de senha.
   */
  async sendResetLink(email: string, token: string) {
    if (!token)
      throw new DomainError(ERROR_MESSAGES.EMAIL_TOKEN_REQUIRED, 400, {
        token: ERROR_MESSAGES.EMAIL_TOKEN_REQUIRED,
      });

    return sendEmail({
      to: email,
      subject: "Redefinição de Senha - B2B Support AI",
      htmlContent: resetPasswordTemplate(token),
    });
  },

  /**
   * Envia email com código de autenticação de dois fatores.
   */
  async sendTwoFactorCode(email: string, code: string) {
    if (!code)
      throw new DomainError(ERROR_MESSAGES.TWO_FACTOR_CODE_REQUIRED, 400, {
        code: "Código é obrigatório.",
      });

    return sendEmail({
      to: email,
      subject: "Código de Autenticação de Dois Fatores - B2B Support AI",
      htmlContent: twoFactorTemplate(code),
    });
  },

  /**
   * Envia convite para usuário participar de uma empresa.
   */
  async sendInvitationLink(
    email: string,
    token: string,
    inviterName: string,
    companyName: string,
    role: string,
  ) {
    if (!token)
      throw new DomainError(ERROR_MESSAGES.EMAIL_TOKEN_REQUIRED, 400, {
        token: ERROR_MESSAGES.EMAIL_TOKEN_REQUIRED,
      });
    if (!inviterName)
      throw new DomainError(ERROR_MESSAGES.INVITER_NAME_REQUIRED, 400, {
        inviterName: ERROR_MESSAGES.INVITER_NAME_REQUIRED,
      });
    if (!companyName)
      throw new DomainError(ERROR_MESSAGES.COMPANY_NAME_REQUIRED, 400, {
        companyName: ERROR_MESSAGES.COMPANY_NAME_REQUIRED,
      });
    if (!role)
      throw new DomainError(ERROR_MESSAGES.ROLE_REQUIRED, 400, {
        role: ERROR_MESSAGES.ROLE_REQUIRED,
      });

    return sendEmail({
      to: email,
      subject: `Convite para ${companyName} - B2B Support AI`,
      htmlContent: invitationTemplate(token, inviterName, companyName, role),
    });
  },
};
