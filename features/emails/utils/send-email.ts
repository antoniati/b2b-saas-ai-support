import { DomainError } from "@/shared";

import {
  sendEmailWithResend,
  type SendEmailType,
  ERROR_MESSAGES,
  mapResendError,
} from "@/features/emails";

/**
 * Envia email.
 */
export async function sendEmail({ to, subject, htmlContent }: SendEmailType) {
  if (!to)
    throw new DomainError(ERROR_MESSAGES.EMAIL_REQUIRED, 400, {
      to: ERROR_MESSAGES.EMAIL_REQUIRED,
    });
  if (!subject)
    throw new DomainError(ERROR_MESSAGES.EMAIL_SUBJECT_REQUIRED, 400, {
      subject: ERROR_MESSAGES.EMAIL_SUBJECT_REQUIRED,
    });
  if (!htmlContent)
    throw new DomainError(ERROR_MESSAGES.EMAIL_CONTENT_REQUIRED, 400, {
      htmlContent: ERROR_MESSAGES.EMAIL_CONTENT_REQUIRED,
    });

  try {
    await sendEmailWithResend({ to, subject, htmlContent });
  } catch (err) {
    mapResendError(err);
  }
}
