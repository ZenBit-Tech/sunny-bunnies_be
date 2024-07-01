import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { MaterialEntity } from '~/entities';

@Injectable()
export class MaterialsRepository extends Repository<MaterialEntity> {
  constructor(dataSource: DataSource) {
    super(MaterialEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<MaterialEntity[]> {
    return this.createQueryBuilder('materials').getMany();
  }
}
