import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { EncryptService } from './encrypt.service';
import { AuthGenerateAccess, AuthSignInDto, AuthSignUpDto } from './dto';
import { USER_PASSWORD_SALT_ROUNDS } from '../../common/constants/constants';
import { TokenService } from './token.service';
import { AuthPayloadToken, AuthResponse, AuthTokens } from '../../common/types';

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

  async signIn(authSignInDto: AuthSignInDto): Promise<AuthResponse> {
    const { email, password } = authSignInDto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new ConflictException('User with this email does not exist');
    }

    const hasSamePassword = await this.encryptService.compare({
      data: password,
      salt: user.passwordSalt,
      passwordHash: user.passwordHash,
    });

    if (!hasSamePassword) {
      throw new ConflictException('Password is not correct');
    }

    const { refreshToken, accessToken } = await this.generateTokens(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accessToken,
      refreshToken,
    };
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
    const { refreshToken, accessToken } = await this.generateTokens(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accessToken,
      refreshToken,
    };
  }

  async generateAccess(
    authGenerateAccessDto: AuthGenerateAccess,
  ): Promise<AuthTokens> {
    const { refreshToken: token } = authGenerateAccessDto;
    const { userId, type } = this.tokenService.decode<AuthPayloadToken>(token);

    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    if (type !== 'refresh') {
      throw new UnauthorizedException('Provide refresh token');
    }

    return this.generateTokens(userId);
  }

  async generateTokens(userId: string): Promise<AuthTokens> {
    const accessToken = await this.tokenService.createAccess<AuthPayloadToken>({
      userId,
    });
    const refreshToken =
      await this.tokenService.createRefresh<AuthPayloadToken>({
        userId,
      });

    return {
      accessToken,
      refreshToken,
    };
  }
}
