import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  BrandEntity,
  CategoryEntity,
  StyleEntity,
  TypeEntity,
} from '~/entities';

import { ProductDetailsController } from './product-details.controller';
import { CategoriesRepository } from './repositories/categories.repository';
import { ProductDetailsService } from './product-details.service';
import { BrandsRepository, StylesRepository } from './repositories';

@Module({
  controllers: [ProductDetailsController],
  providers: [
    ProductDetailsService,
    CategoriesRepository,
    BrandsRepository,
    StylesRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([
      BrandEntity,
      CategoryEntity,
      StyleEntity,
      TypeEntity,
    ]),
  ],
})
export class ProductDetailsModule {}
