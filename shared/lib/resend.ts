'use server';

import { Resend } from 'resend';

import { SendEmailType } from '@/shared';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, htmlContent }: SendEmailType) => {
  return resend.emails.send({
    from: 'B2B Support AI <nao-responder@b2bSupportAI.com.br>',
    to: to,
    subject: subject,
    html: htmlContent,
  });
};
