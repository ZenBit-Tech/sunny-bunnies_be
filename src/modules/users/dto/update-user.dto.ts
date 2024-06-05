import { User } from '../../../entities';

export type UpdateUserDto = Partial<Omit<User, 'id'>>;
