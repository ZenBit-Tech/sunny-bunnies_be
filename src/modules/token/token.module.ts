import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenService } from '~/modules/token/token.service';
import { TokenRepository } from '~/modules/token/token.repository';
import { Token } from '~/modules/token/token.package';

@Module({
  providers: [TokenService, TokenRepository, Token, ConfigService],
  exports: [TokenService, Token],
})
export class TokenModule {}
