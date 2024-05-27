import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { UserSignUpDto } from './dto';
import { USER_PASSWORD_SALT_ROUNDS } from '../../common/constants/user-password-salt-rounds.constant';

@Injectable()
export class UsersService {
  private readonly usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async createOne(userSignUpDto: UserSignUpDto): Promise<User> {
    const { email, password } = userSignUpDto;

    const passwordSalt = await genSalt(USER_PASSWORD_SALT_ROUNDS);
    const passwordHash = await hash(password, passwordSalt);

    return this.usersRepository.createOne({
      email,
      passwordHash,
      passwordSalt,
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findByEmail(email);
  }
}
