import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { CategoryEntity, SizeEntity } from '~/entities';

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

  async findSizesByCategoryId(categoryId: number): Promise<SizeEntity[]> {
    const category = await this.findOne({
      where: {
        id: categoryId,
      },
      relations: ['sizes'],
    });

    if (!category) {
      throw new Error(`Category with ID ${categoryId} not found`);
    }

    return category ? category.sizes : [];
  }
}
