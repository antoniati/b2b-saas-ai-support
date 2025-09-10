import { EMAIL_CONFIG } from "@/features/emails";

export function twoFactorTemplate(code: string): string {
  return `
    <h2>Autenticação de Dois Fatores</h2>
    <p>
      Seu código de autenticação é: <strong>${code}</strong>
    </p>
    <p>
      Use este código para completar o login. Se você não solicitou, ignore este e-mail.
    </p>
    <p>
      Em caso de dúvidas, fale conosco no 
      <a href="${EMAIL_CONFIG.supportWhatsApp}" style="color: #007bff;">WhatsApp</a>.
    </p>
    <p>Atenciosamente,<br/>Equipe B2B Support AI</p>
  `;
}
