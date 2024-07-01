import { Injectable } from '@nestjs/common';

import {
  BrandEntity,
  CategoryEntity,
  ColorEntity,
  MaterialEntity,
  SizeEntity,
  StyleEntity,
} from '~/entities';
import {
  BrandsRepository,
  CategoriesRepository,
  MaterialsRepository,
  StylesRepository,
} from './repositories/index';
import { SizesRepository } from './repositories/sizes.repository';
import { ColorRepository } from './repositories/colors.repository';

@Injectable()
export class ProductDetailsService {
  private readonly categoriesRepository: CategoriesRepository;

  private readonly brandsRepository: BrandsRepository;

  private readonly stylesRepository: StylesRepository;

  private readonly materialsRepository: MaterialsRepository;

  private readonly colorsRepository: ColorRepository;

  private readonly sizesRepository: SizesRepository;

  constructor(
    categoriesRepository: CategoriesRepository,
    brandsRepository: BrandsRepository,
    stylesRepository: StylesRepository,
    materialsRepository: MaterialsRepository,
    sizesRepository: SizesRepository,
    colorsRepository: ColorRepository,
  ) {
    this.categoriesRepository = categoriesRepository;
    this.brandsRepository = brandsRepository;
    this.stylesRepository = stylesRepository;
    this.materialsRepository = materialsRepository;
    this.sizesRepository = sizesRepository;
    this.colorsRepository = colorsRepository;
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

  async findAllMaterials(): Promise<MaterialEntity[]> {
    return this.materialsRepository.findAll();
  }

  async findAllColors(): Promise<ColorEntity[]> {
    return this.colorsRepository.findAll();
  }

  async findAllSizes(): Promise<SizeEntity[]> {
    return this.sizesRepository.findAll();
  }
}
