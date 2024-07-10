import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { CategoryEntity } from '~/entities';

@Injectable()
export class CategoriesRepository extends Repository<CategoryEntity> {
  constructor(dataSource: DataSource) {
    super(CategoryEntity, dataSource.createEntityManager());
  }

  findAll(): Promise<CategoryEntity[]> {
    return this.createQueryBuilder('category')
      .leftJoinAndSelect('category.types', 'types')
      .leftJoinAndSelect('category.styles', 'styles')
      .leftJoinAndSelect('category.brands', 'brands')
      .leftJoinAndSelect('category.materials', 'materials')
      .getMany();
  }
}
