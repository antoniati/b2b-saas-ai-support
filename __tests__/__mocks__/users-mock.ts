jest.mock("@/features/users/services/users-service", () => ({
  UserService: {
    create: jest.fn(),
    getById: jest.fn(),
    getByEmail: jest.fn(),
    updatePassword: jest.fn(),
    updatePersonalData: jest.fn(),
    updateTwoFactor: jest.fn(),
    updateVerificationDate: jest.fn(),
    verifyAccountConfirmed: jest.fn(),
  },
}));
