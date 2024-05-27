import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { EncryptService } from './encrypt.service';
import { AuthSignUpDto } from './dto';
import { USER_PASSWORD_SALT_ROUNDS } from '../../common/constants/user-password-salt-rounds.constant';

@Injectable()
export class AuthService {
  private readonly usersService: UsersService;

  private readonly encryptService: EncryptService;

  constructor(usersService: UsersService, encryptService: EncryptService) {
    this.usersService = usersService;
    this.encryptService = encryptService;
  }

  async signUp(authSignUpDto: AuthSignUpDto): Promise<User> {
    const { name, email, password } = authSignUpDto;
    const existedUser = await this.usersService.findByEmail(email);

    if (existedUser) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordSalt = await this.encryptService.generateSalt(
      USER_PASSWORD_SALT_ROUNDS,
    );
    const passwordHash = await this.encryptService.encrypt(
      password,
      passwordSalt,
    );

    const user = await this.usersService.createOne({
      name,
      email,
      passwordSalt,
      passwordHash,
    });

    return user;
  }
}
