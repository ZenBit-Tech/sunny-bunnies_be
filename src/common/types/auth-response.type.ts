import { User } from '../../modules/users/user.entity';

export type AuthResponse = {
  user: Omit<User, 'passwordHash' | 'passwordSalt'>;
  token: string;
};
