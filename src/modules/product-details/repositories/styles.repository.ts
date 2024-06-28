import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { StyleEntity } from '~/entities';

@Injectable()
export class StylesRepository extends Repository<StyleEntity> {
  constructor(dataSource: DataSource) {
    super(StyleEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<StyleEntity[]> {
    return this.createQueryBuilder('styles').getMany();
  }
}
