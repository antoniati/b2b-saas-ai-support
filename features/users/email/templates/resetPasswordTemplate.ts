import { EMAIL_CONFIG } from '@/features/users';

export function resetPasswordTemplate(token: string): string {
  return `
    <h2>Redefinição de Senha</h2>
    <p>
      Recebemos uma solicitação para redefinir a senha da sua conta no <b>B2B Support AI</b>.
    </p>
    <p>
      Caso deseje redefinir sua senha, clique abaixo:
    </p>
    <a href="${EMAIL_CONFIG.domainUrl}/auth/redefinir-senha?token=${token}"
       style="display: inline-block; padding: 12px 24px; font-size: 16px; 
              color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 4px;">
      Redefinir Senha
    </a>
    <p>
      Este link expirará em 1 hora. Se você não solicitou esta redefinição, ignore este e-mail.
    </p>
    <p>Atenciosamente,<br/>Equipe B2B Support AI</p>
  `;
}
