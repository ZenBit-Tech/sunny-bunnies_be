import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  BrandEntity,
  CategoryEntity,
  ColorEntity,
  MaterialEntity,
  SizeEntity,
  StyleEntity,
  TypeEntity,
} from '~/entities';

import { ProductDetailsController } from './product-details.controller';
import { CategoriesRepository } from './repositories/categories.repository';
import { ProductDetailsService } from './product-details.service';
import {
  BrandsRepository,
  MaterialsRepository,
  StylesRepository,
} from './repositories';
import { ColorRepository } from './repositories/colors.repository';
import { SizesRepository } from './repositories/sizes.repository';

@Module({
  controllers: [ProductDetailsController],
  providers: [
    ProductDetailsService,
    CategoriesRepository,
    BrandsRepository,
    StylesRepository,
    MaterialsRepository,
    ColorRepository,
    SizesRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([
      BrandEntity,
      CategoryEntity,
      StyleEntity,
      TypeEntity,
      MaterialEntity,
      ColorEntity,
      SizeEntity,
    ]),
  ],
})
export class ProductDetailsModule {}
