import { sendEmail } from '@/shared/lib/resend';
import { DomainError, ERROR_MESSAGES, SendEmailType } from '@/shared';
import { verificationTemplate, resetPasswordTemplate, twoFactorTemplate } from '@/features/users';

// Envia email utilizando o Resend
async function send({ to, subject, htmlContent }: SendEmailType) {
  try {
    await sendEmail({ to, subject, htmlContent });
  } catch (err) {
    console.error('Erro ao enviar email:', err);
    throw new DomainError(ERROR_MESSAGES.EMAIL_SENDING_FAILED, 500);
  }
}

/**
 * Serviços de envio de emails
 */
export const EmailService = {
  /**
   * Envia email de confirmação de conta com link de confirmação.
   */
  async sendVerificationLink(email: string, token: string) {
    return send({
      to: email,
      subject: 'Confirmação de Conta - B2B Support AI',
      htmlContent: verificationTemplate(token),
    });
  },

  /**
   * Envia email de redefinição de senha
   */
  async sendResetLink(email: string, token: string) {
    return send({
      to: email,
      subject: 'Redefinição de Senha - B2B Support AI',
      htmlContent: resetPasswordTemplate(token),
    });
  },

  /**
   * Envia email com código de autenticação de dois fatores para o email informado.
   */
  async sendTwoFactorCode(email: string, code: string) {
    return send({
      to: email,
      subject: 'Código de Autenticação de dois fatores - B2B Support AI',
      htmlContent: twoFactorTemplate(code),
    });
  },
};
