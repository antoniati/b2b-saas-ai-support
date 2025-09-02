/**
 * Dados para envio de email
 */
export type SendEmailType = {
  to: string | string[];
  subject: string;
  htmlContent: string;
};

/**
 * Resposta da API de envio de email
 */
export type SendEmailResponse = {
  id: string;
  status: string;
  message: string;
};
