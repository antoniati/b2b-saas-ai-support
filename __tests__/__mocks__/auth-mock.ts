jest.mock("@/features/auth/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("@/features/auth/utils/private-routes", () => ({
  handlePrivateRoute: jest.fn(),
}));

jest.mock("@/features/auth/utils/auth-routes", () => ({
  handleAuthRoute: jest.fn(),
}));

jest.mock("@/features/auth/utils/ignore-routes", () => ({
  shouldBypassAuth: jest.fn(),
}));
