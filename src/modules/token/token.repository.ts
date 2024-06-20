import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TokenEntity } from '~/entities/token.entity';

@Injectable()
export class TokenRepository extends Repository<TokenEntity> {
  constructor(dataSource: DataSource) {
    super(TokenEntity, dataSource.createEntityManager());
  }

  async createOne(payload: Omit<TokenEntity, 'id'>): Promise<TokenEntity> {
    const { token } = payload;

    const tokenEntity = this.create({
      token,
    });
    await this.save(tokenEntity);

    return tokenEntity;
  }

  async findByToken(token: string): Promise<TokenEntity> {
    return this.findOne({
      where: {
        token,
      },
    });
  }

  async deleteOne(id: number): Promise<void> {
    const token = await this.findOne({
      where: {
        id,
      },
    });

    await this.remove([token]);
  }
}
