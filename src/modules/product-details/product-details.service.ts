import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BrandEntity,
  CategoryEntity,
  ColorEntity,
  MaterialEntity,
  SizeEntity,
  StyleEntity,
} from '~/entities';

import { CategoriesRepository } from './categories.repository';

@Injectable()
export class ProductDetailsService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandsRepository: Repository<BrandEntity>,

    @InjectRepository(StyleEntity)
    private readonly stylesRepository: Repository<StyleEntity>,

    @InjectRepository(MaterialEntity)
    private readonly materialsRepository: Repository<MaterialEntity>,

    @InjectRepository(ColorEntity)
    private readonly colorsRepository: Repository<ColorEntity>,

    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async findAllCategoriesWithTypes(): Promise<CategoryEntity[]> {
    return this.categoriesRepository.findAllWithTypes();
  }

  async findAllBrands(): Promise<BrandEntity[]> {
    return this.brandsRepository.find();
  }

  async findAllStyles(): Promise<StyleEntity[]> {
    return this.stylesRepository.find();
  }

  async findAllMaterials(): Promise<MaterialEntity[]> {
    return this.materialsRepository.find();
  }

  async findAllColors(): Promise<ColorEntity[]> {
    return this.colorsRepository.find();
  }

  async findAllSizesByCategory(categoryId: number): Promise<SizeEntity[]> {
    return this.categoriesRepository.findSizesByCategoryId(categoryId);
  }
}
