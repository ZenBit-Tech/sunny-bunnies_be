import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('sign-up')
  async signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<User> {
    return this.authService.signUp(authSignUpDto);
  }
}
