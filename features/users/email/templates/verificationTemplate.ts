import { EMAIL_CONFIG } from '@/features/users';

export function verificationTemplate(token: string): string {
  return `
    <h2>Confirmação de Conta</h2>
    <p>
      Agradecemos por se registrar na <b>B2B Support AI</b>! 
      Clique abaixo para confirmar sua conta:
    </p>
    <a href="${EMAIL_CONFIG.domainUrl}/auth/confirmar-conta?token=${token}"
       style="display: inline-block; padding: 12px 24px; font-size: 16px; 
              color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 4px;">
      Confirmar Registro
    </a>
    <p style="margin-top: 20px;">
      Em caso de dúvidas, fale conosco no 
      <a href="${EMAIL_CONFIG.supportWhatsApp}" style="color: #007bff;">WhatsApp</a>.
    </p>
    <p>Atenciosamente,<br/>Equipe B2B Support AI</p>
  `;
}
