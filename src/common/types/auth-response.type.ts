import { User } from '../../modules/users/user.entity';
import { AuthTokens } from './auth-tokens.type';

export type AuthResponse = {
  user: Omit<User, 'passwordHash' | 'passwordSalt'>;
} & AuthTokens;
