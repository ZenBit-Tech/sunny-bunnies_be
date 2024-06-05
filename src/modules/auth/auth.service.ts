import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from '../users/users.service';
import { EncryptService } from './encrypt.service';
import {
  AuthGenerateAccess,
  AuthSignInDto,
  AuthSignUpDto,
  AuthVerifyEmailDto,
  AuthVerifyOtpDto,
} from './dto';
import { USER_PASSWORD_SALT_ROUNDS } from '../../common/constants/constants';
import { TokenService } from './token.service';
import {
  AuthPayloadToken,
  AuthResponse,
  AuthTokens,
  OtpCodePayloadToken,
} from '../../common/types';

@Injectable()
export class AuthService {
  private readonly usersService: UsersService;

  private readonly encryptService: EncryptService;

  private readonly tokenService: TokenService;

  private readonly mailerService: MailerService;

  constructor(
    usersService: UsersService,
    encryptService: EncryptService,
    tokenService: TokenService,
    mailerService: MailerService,
  ) {
    this.usersService = usersService;
    this.encryptService = encryptService;
    this.tokenService = tokenService;
    this.mailerService = mailerService;
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
      user,
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
      user,
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

  async verifyEmail(authVerifyEmailDto: AuthVerifyEmailDto): Promise<void> {
    const { email } = authVerifyEmailDto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new ConflictException('This email is not associated with any user');
    }

    if (user.isVerified) {
      throw new ConflictException('Email is already verified');
    }

    let otp = '';

    for (let i = 0; i < 6; i += 1) {
      otp += Math.floor(Math.random() * 10);
    }

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Black circle OTP code email verification',
      html: `<p>OTP code: <b>${otp}</b></p>`,
    });

    const otpToken = await this.tokenService.create<OtpCodePayloadToken>(
      {
        code: otp,
        email,
      },
      {
        expiresIn: '1m',
      },
    );

    return void (await this.usersService.updateById(user.id, {
      otpToken,
    }));
  }

  async verifyOtp(authVerifyOtp: AuthVerifyOtpDto): Promise<void> {
    const { code: providedCode, email } = authVerifyOtp;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new ConflictException('This email is not associated with any user');
    }

    if (user.isVerified) {
      throw new ConflictException('Email is already verified');
    }

    const { code: otpCode, exp } =
      this.tokenService.decode<OtpCodePayloadToken>(user.otpToken);

    const isValid = providedCode === otpCode;

    if (!isValid) {
      throw new ConflictException('Invalid code');
    }

    const isExpired = this.tokenService.isExpired(exp);

    if (isExpired) {
      throw new ConflictException('Code is expired');
    }

    return void (await this.usersService.updateById(user.id, {
      isVerified: true,
      otpToken: null,
    }));
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
