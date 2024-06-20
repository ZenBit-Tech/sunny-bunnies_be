import { Injectable } from '@nestjs/common';
import { TokenRepository } from '~/modules/token/token.repository';
import { TokenCreateDto } from '~/modules/token/dto';
import { TokenEntity } from '~/entities/token.entity';

@Injectable()
export class TokenService {
  private readonly tokenRepository: TokenRepository;

  constructor(tokenRepository: TokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  async createOne(tokenCreateDto: TokenCreateDto): Promise<TokenEntity> {
    const { token } = tokenCreateDto;

    return this.tokenRepository.createOne({
      token,
    });
  }

  async findByToken(token: string): Promise<TokenEntity> {
    return this.tokenRepository.findByToken(token);
  }

  async deleteOne(id: number): Promise<void> {
    return this.tokenRepository.deleteOne(id);
  }
}
