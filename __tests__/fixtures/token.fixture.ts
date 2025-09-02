import { TokenType } from '@prisma/client';
import { userDataTest } from './user.fixtures';

export const tokenPropsMock = {
  id: 'tokenId123',
  email: userDataTest.email,
  token: 'tokenABC',
  type: TokenType.TWO_FACTOR,
  expires: new Date(Date.now() + 3600_000),
};
