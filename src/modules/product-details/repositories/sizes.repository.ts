import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { SizeEntity } from '~/entities';

@Injectable()
export class SizesRepository extends Repository<SizeEntity> {
  constructor(dataSource: DataSource) {
    super(SizeEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<SizeEntity[]> {
    return this.createQueryBuilder('size').getMany();
  }
}
