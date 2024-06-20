import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { Encrypt, Otp } from '~/utils';
import { TokenModule } from '~/modules/token/token.module';

@Module({
  imports: [UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, Encrypt, Otp, ConfigService],
})
export class AuthModule {}
