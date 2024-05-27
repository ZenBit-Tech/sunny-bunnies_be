import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto';
import { AuthResponse } from '../../common/types';
import { PublicRoute } from '../../common/decorators/public-route.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @PublicRoute()
  @Post('sign-up')
  async signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<AuthResponse> {
    return this.authService.signUp(authSignUpDto);
  }
}
