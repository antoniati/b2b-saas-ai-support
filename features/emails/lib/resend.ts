"use server";

import { Resend } from "resend";

import { SendEmailType } from "@/features/emails";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123");

/**
 * Envia email via Resend.
 */
export const sendEmailWithResend = async ({
  to,
  subject,
  htmlContent,
}: SendEmailType) => {
  return resend.emails.send({
    from: "B2B Support AI <nao-responder@b2bSupportAI.com.br>",
    to: to,
    subject: subject,
    html: htmlContent,
  });
};
