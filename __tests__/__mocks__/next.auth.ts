const NextAuth = jest.fn(() => ({
  handlers: {},
  auth: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

export default NextAuth;
