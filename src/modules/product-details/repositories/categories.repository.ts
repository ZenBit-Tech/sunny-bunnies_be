import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { CategoryEntity } from '~/entities';

@Injectable()
export class CategoriesRepository extends Repository<CategoryEntity> {
  constructor(dataSource: DataSource) {
    super(CategoryEntity, dataSource.createEntityManager());
  }

  async findAllWithTypes(): Promise<CategoryEntity[]> {
    return this.createQueryBuilder('category')
      .leftJoinAndSelect('category.types', 'types')
      .select(['category.id', 'category.name', 'types.id', 'types.name'])
      .getMany();
  }
}
