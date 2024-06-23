import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import {
  AuthGenerateAccess,
  AuthResetPasswordDto,
  AuthRestorePasswordDto,
  AuthSignInDto,
  AuthSignUpDto,
  AuthVerifyEmailDto,
  AuthVerifyOtpDto,
} from './dto';
import { GoogleAuthSingUpDto } from '~/modules/auth/dto';
import {
  AuthPayloadToken,
  AuthResponse,
  AuthTokens,
  OtpCodePayloadToken,
} from '~/common/types';
import { Encrypt, Token, Otp } from '~/utils';
import { TokenService } from '~/modules/token/token.service';

@Injectable()
export class AuthService {
  private readonly usersService: UsersService;

  private readonly encrypt: Encrypt;

  private readonly tokenService: TokenService;

  private readonly mailerService: MailerService;

  private readonly otp: Otp;

  private readonly configService: ConfigService;

  private readonly token: Token;

  private readonly adminRole = 'admin';

  constructor(
    usersService: UsersService,
    encryptService: Encrypt,
    tokenService: TokenService,
    mailerService: MailerService,
    otp: Otp,
    configService: ConfigService,
    token: Token,
  ) {
    this.usersService = usersService;
    this.encrypt = encryptService;
    this.tokenService = tokenService;
    this.mailerService = mailerService;
    this.otp = otp;
    this.configService = configService;
    this.token = token;
  }

  async signIn(authSignInDto: AuthSignInDto): Promise<AuthResponse> {
    const { email, password } = authSignInDto;

    const user = await this.usersService.findByEmail(email);

    if (!user || user.profile.role === this.adminRole) {
      throw new ConflictException('Invalid email or password');
    }

    const hasSamePassword = await this.encrypt.compare({
      data: password,
      salt: user.passwordSalt,
      passwordHash: user.passwordHash,
    });

    if (!hasSamePassword) {
      throw new ConflictException('Invalid email or password');
    }

    const { refreshToken, accessToken } = await this.generateTokens(user.id);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async adminSignIn(authSignInDto: AuthSignInDto): Promise<AuthResponse> {
    const { email, password } = authSignInDto;

    const user = await this.usersService.findByEmail(email);

    if (!user || user.profile.role !== this.adminRole) {
      throw new ConflictException('Invalid email or password');
    }

    const hasSamePassword = await this.encrypt.compare({
      data: password,
      salt: user.passwordSalt,
      passwordHash: user.passwordHash,
    });

    if (!hasSamePassword) {
      throw new ConflictException('Invalid email or password');
    }

    const { refreshToken, accessToken } = await this.generateTokens(user.id);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async signUpGoogle(body: GoogleAuthSingUpDto): Promise<AuthResponse> {
    const { email, name, jti } = this.token.decode(body.credential) as {
      email: string;
      name: string;
      jti: string;
    };

    if (!email || !name) {
      throw new NotFoundException("Can't find your google account.");
    }

    const existedUser = await this.usersService.findByEmail(email);

    if (existedUser) {
      const { refreshToken, accessToken } = await this.generateTokens(
        existedUser.id,
      );
      return {
        user: existedUser,
        accessToken,
        refreshToken,
      };
    }

    const randomGeneratedPassword = this.encrypt.generateRandomPassword();
    const userRandomPassword = `${jti}+${randomGeneratedPassword}`;

    const user = await this.usersService.createOne({
      name,
      email,
      password: userRandomPassword,
    });

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

    const user = await this.usersService.createOne({
      name,
      email,
      password,
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
    const { userId, type } = this.token.decode<AuthPayloadToken>(token);

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

    const otp = this.otp.generateCode({ length: 6 });
    const expiresIn = '2m';

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Black circle OTP code email verification',
      template: 'verify-email',
      context: {
        name: user.name,
        userEmail: user.email,
        code: otp,
        expiresIn,
      },
    });

    const otpToken = await this.token.generate<OtpCodePayloadToken>(
      {
        code: otp,
        email,
      },
      {
        expiresIn,
      },
    );

    await this.usersService.updateById(user.id, {
      otpToken,
    });
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

    const { code: otpCode, exp } = this.token.decode<OtpCodePayloadToken>(
      user.otpToken,
    );

    const isValid = providedCode === otpCode;

    if (!isValid) {
      throw new ConflictException('Invalid code');
    }

    const isExpired = this.token.isExpired(exp);

    if (isExpired) {
      throw new ConflictException('Code is expired');
    }

    await this.usersService.updateById(user.id, {
      isVerified: true,
      otpToken: null,
    });
  }

  async restorePassword(
    authRestorePasswordOtpCode: AuthRestorePasswordDto,
  ): Promise<void> {
    const { email } = authRestorePasswordOtpCode;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new ConflictException('This email is not associated with any user');
    }
    const expiresIn = '5m';

    const token = await this.token.generate<AuthPayloadToken>(
      {
        userId: user.id,
      },
      {
        expiresIn,
      },
    );

    const resetPasswordPageLink = `${this.configService.get<string>('CLIENT_RESET_PASSWORD-BASE_URL')}?${new URLSearchParams(
      {
        token,
      },
    ).toString()}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Black circle password restore',
      template: 'restore-password',
      context: {
        name: user.name,
        userEmail: user.email,
        restorePasswordLink: resetPasswordPageLink,
        expiresIn,
      },
    });

    await this.tokenService.createOne({
      token,
    });
  }

  async resetPassword(authResetPasswordDto: AuthResetPasswordDto) {
    const { token, password } = authResetPasswordDto;

    const { userId, exp } = this.token.decode<AuthPayloadToken>(token);

    if (!userId) {
      throw new ConflictException('Invalid token');
    }

    const isExpired = this.token.isExpired(exp);

    if (isExpired) {
      throw new UnauthorizedException('Session expired');
    }

    const storedToken = await this.tokenService.findByToken(token);
    const isTokenStored = Boolean(storedToken);

    if (!isTokenStored) {
      throw new UnauthorizedException('Session expired');
    }

    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new ConflictException('Invalid token');
    }

    await this.usersService.updatePassword(user.id, {
      password,
    });

    await this.tokenService.deleteOne(storedToken.id);
  }

  async generateTokens(userId: string): Promise<AuthTokens> {
    const accessToken = await this.token.generateAccess<AuthPayloadToken>({
      userId,
    });
    const refreshToken = await this.token.generateRefresh<AuthPayloadToken>({
      userId,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
