import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { Encrypt, Otp, Token } from '~/utils';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, Encrypt, Otp, ConfigService, Token],
  exports: [Token],
})
export class AuthModule {}
