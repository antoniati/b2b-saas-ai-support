export type SendEmailType = {
  to: string | string[];
  subject: string;
  htmlContent: string;
};

export type SendEmailResponse = {
  id: string;
  status: string;
  message: string;
};
