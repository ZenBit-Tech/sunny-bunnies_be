import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { EncryptService } from './encrypt.service';
import { AuthSignUpDto } from './dto';
import { USER_PASSWORD_SALT_ROUNDS } from '../../common/constants';
import { TokenService } from './token.service';
import { AuthPayloadToken, AuthResponse } from '../../common/types';

@Injectable()
export class AuthService {
  private readonly usersService: UsersService;

  private readonly encryptService: EncryptService;

  private readonly tokenService: TokenService;

  constructor(
    usersService: UsersService,
    encryptService: EncryptService,
    tokenService: TokenService,
  ) {
    this.usersService = usersService;
    this.encryptService = encryptService;
    this.tokenService = tokenService;
  }

  async signUp(authSignUpDto: AuthSignUpDto): Promise<AuthResponse> {
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
    const token = await this.tokenService.create<AuthPayloadToken>({
      userId: user.id,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    };
  }
}
