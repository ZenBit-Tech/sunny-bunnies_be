import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  AuthGenerateAccess,
  AuthSignInDto,
  AuthSignUpDto,
  AuthVerifyEmailDto,
  AuthVerifyOtpDto,
} from './dto';
import { AuthResponse, AuthTokens } from '../../common/types';
import { PublicRoute } from '../../common/decorators';
import { TransformationInterceptor } from '../../common/interceptors';

@ApiTags('Auth')
@UseInterceptors(TransformationInterceptor)
@Controller('auth')
export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @PublicRoute()
  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() authSignInDto: AuthSignInDto): Promise<AuthResponse> {
    return this.authService.signIn(authSignInDto);
  }

  @PublicRoute()
  @Post('sign-up')
  @HttpCode(201)
  async signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<AuthResponse> {
    return this.authService.signUp(authSignUpDto);
  }

  @PublicRoute()
  @Post('generate-access')
  async generateAccess(
    @Body() authGenerateAccessDto: AuthGenerateAccess,
  ): Promise<AuthTokens> {
    return this.authService.generateAccess(authGenerateAccessDto);
  }

  @PublicRoute()
  @HttpCode(200)
  @Post('verify-email')
  async verifyEmail(
    @Body() authVerifyEmail: AuthVerifyEmailDto,
  ): Promise<void> {
    return this.authService.verifyEmail(authVerifyEmail);
  }

  @PublicRoute()
  @HttpCode(200)
  @Post('verify-otp')
  async verifyOtp(@Body() authVerifyOtpDto: AuthVerifyOtpDto): Promise<void> {
    return this.authService.verifyOtp(authVerifyOtpDto);
  }
}
