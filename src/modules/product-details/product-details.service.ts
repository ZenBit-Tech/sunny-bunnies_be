import { Injectable } from '@nestjs/common';

import { BrandEntity, CategoryEntity, StyleEntity } from '~/entities';
import {
  BrandsRepository,
  CategoriesRepository,
  StylesRepository,
} from './repositories/index';

@Injectable()
export class ProductDetailsService {
  private readonly categoriesRepository: CategoriesRepository;

  private readonly brandsRepository: BrandsRepository;

  private readonly stylesRepository: StylesRepository;

  constructor(
    categoriesRepository: CategoriesRepository,
    brandsRepository: BrandsRepository,
    stylesRepository: StylesRepository,
  ) {
    this.categoriesRepository = categoriesRepository;
    this.brandsRepository = brandsRepository;
    this.stylesRepository = stylesRepository;
  }

  async findAllCategoriesWithTypes(): Promise<CategoryEntity[]> {
    return this.categoriesRepository.findAllWithTypes();
  }

  async findAllBrands(): Promise<BrandEntity[]> {
    return this.brandsRepository.findAll();
  }

  async findAllStyles(): Promise<StyleEntity[]> {
    return this.stylesRepository.findAll();
  }
}
