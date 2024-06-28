import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { BrandEntity } from '~/entities';

@Injectable()
export class BrandsRepository extends Repository<BrandEntity> {
  constructor(dataSource: DataSource) {
    super(BrandEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<BrandEntity[]> {
    return this.createQueryBuilder('brands').getMany();
  }
}
