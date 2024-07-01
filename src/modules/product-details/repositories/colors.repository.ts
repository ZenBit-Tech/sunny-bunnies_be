import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { ColorEntity } from '~/entities';

@Injectable()
export class ColorRepository extends Repository<ColorEntity> {
  constructor(dataSource: DataSource) {
    super(ColorEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<ColorEntity[]> {
    return this.createQueryBuilder('colors').getMany();
  }
}
