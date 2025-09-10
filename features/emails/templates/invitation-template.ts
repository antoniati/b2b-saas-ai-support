import { EMAIL_CONFIG } from "@/features/emails";

export function invitationTemplate(
  token: string,
  inviterName: string,
  companyName: string,
  role: string,
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px;
        }
        .header { 
          text-align: center; 
          border-bottom: 2px solid #007bff; 
          padding-bottom: 20px; 
          margin-bottom: 20px;
        }
        .button { 
          display: inline-block; 
          padding: 12px 24px; 
          font-size: 16px; 
          color: #ffffff; 
          background-color: #007bff; 
          text-decoration: none; 
          border-radius: 4px; 
          margin: 20px 0;
        }
        .footer { 
          margin-top: 30px; 
          padding-top: 20px; 
          border-top: 1px solid #eee; 
          font-size: 14px; 
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>B2B Support AI</h2>
      </div>
      
      <h2>Você foi convidado(a) para a equipe ${companyName}</h2>
      
      <p>Olá,</p>
      
      <p>
        <strong>${inviterName}</strong> convidou você para fazer parte da equipe 
        <strong>${companyName}</strong> na plataforma B2B Support AI como <strong>${role === "ADMIN" ? "Administrador" : role === "AGENT" ? "Gerente" : "Colaborador"}</strong>.
      </p>
      
      <p>
        O B2B Support AI é uma plataforma completa de suporte ao cliente com inteligência artificial
        para otimizar o atendimento e melhorar a experiência dos seus clientes.
      </p>
      
      <div style="text-align: center;">
        <a href="${EMAIL_CONFIG.domainUrl}/auth/aceitar-convite?token=${token}" 
           class="button">
          Aceitar Convite
        </a>
      </div>
      
      <p>
        <strong>Link direto:</strong><br/>
        ${EMAIL_CONFIG.domainUrl}/auth/aceitar-convite?token=${token}
      </p>
      
      <p>
        Este link expirará em 48 horas por motivos de segurança.
        Se você não reconhece este convite, ignore este email.
      </p>
      
      <div class="footer">
        <p>
          Em caso de dúvidas, fale conosco no 
          <a href="${EMAIL_CONFIG.supportWhatsApp}" style="color: #007bff;">WhatsApp</a>.
        </p>
        
        <p>
          Atenciosamente,<br/>
          <strong>Equipe B2B Support AI</strong>
        </p>
      </div>
    </body>
    </html>
  `;
}
