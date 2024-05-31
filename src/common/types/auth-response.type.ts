import { User } from '../../entities';
import { AuthTokens } from './auth-tokens.type';

export type AuthResponse = {
  user: User;
} & AuthTokens;
