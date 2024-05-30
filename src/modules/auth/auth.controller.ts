import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGenerateAccess, AuthSignInDto, AuthSignUpDto } from './dto';
import { AuthResponse, AuthTokens } from '../../common/types';
import { GetUser, PublicRoute } from '../../common/decorators';
import { User } from '../../entities';

@ApiTags('Auth')
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

  @Get('current')
  @HttpCode(200)
  getCurrent(@GetUser() user: User): User {
    return user;
  }
}
