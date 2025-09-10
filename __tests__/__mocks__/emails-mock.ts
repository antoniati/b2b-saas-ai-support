jest.mock("@/features/emails/services/emails-service", () => ({
  EmailService: {
    sendVerificationLink: jest.fn(),
    sendResetPasswordLink: jest.fn(),
    sendTwoFactorCode: jest.fn(),
    sendInvitationLink: jest.fn(),
  },
}));
