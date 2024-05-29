import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto';
import { AuthResponse, AuthTokens } from '../../common/types';
import { PublicRoute, GetUser } from '../../common/decorators';
import { User } from '../../entities';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Get('generate-access')
  async generateAccess(@GetUser() user: User): Promise<AuthTokens> {
    return this.authService.generateAccess(user.id);
  }

  @PublicRoute()
  @Post('sign-up')
  @HttpCode(201)
  async signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<AuthResponse> {
    return this.authService.signUp(authSignUpDto);
  }
}
