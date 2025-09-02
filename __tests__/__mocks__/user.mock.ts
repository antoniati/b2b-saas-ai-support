import { validateSchema } from '@/shared';
import { EmailService, TokenService, UserService } from '@/features/users';
import { userDataTest } from '@/__tests__/fixtures/user.fixtures';
import { tokenPropsMock } from '@/__tests__/fixtures/token.fixture';

export const createUserMock = () => {
  // UserService
  jest.spyOn(UserService, 'getById').mockResolvedValue({ ...userDataTest });
  jest.spyOn(UserService, 'getByEmail').mockResolvedValue({ ...userDataTest });
  jest.spyOn(UserService, 'create').mockResolvedValue({ ...userDataTest });
  jest.spyOn(UserService, 'updatePersonalData').mockImplementation(async (id, email, name) => {
    return { ...userDataTest, email, name };
  });
  jest.spyOn(UserService, 'updateTwoFactor').mockResolvedValue({ ...userDataTest });

  // TokenService
  jest.spyOn(TokenService, 'generate').mockResolvedValue({ ...tokenPropsMock });

  // EmailService
  jest.spyOn(EmailService, 'sendVerificationLink').mockResolvedValue(undefined);

  // Validation
  jest.spyOn({ validateSchema }, 'validateSchema').mockImplementation((schema, values) => values);
};
