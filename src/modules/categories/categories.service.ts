import { Injectable } from '@nestjs/common';

import { CategoryEntity } from '~/entities';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  private readonly categoriesRepository: CategoriesRepository;

  constructor(categoriesRepository: CategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoriesRepository.findAll();
  }
}
