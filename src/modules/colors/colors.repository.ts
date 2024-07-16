import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { ColorEntity } from '~/entities';

@Injectable()
export class ColorsRepository extends Repository<ColorEntity> {
  constructor(dataSource: DataSource) {
    super(ColorEntity, dataSource.createEntityManager());
  }

  findAll(): Promise<ColorEntity[]> {
    return this.find();
  }
}
