import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  BrandEntity,
  CategoryEntity,
  ColorEntity,
  MaterialEntity,
  ProductVariantEntity,
  SizeEntity,
  StyleEntity,
  TypeEntity,
} from '~/entities';

import { ProductDetailsController } from './product-details.controller';
import { ProductDetailsService } from './product-details.service';
import { CategoriesRepository } from './categories.repository';

@Module({
  controllers: [ProductDetailsController],
  providers: [ProductDetailsService, CategoriesRepository],
  imports: [
    TypeOrmModule.forFeature([
      BrandEntity,
      CategoryEntity,
      StyleEntity,
      TypeEntity,
      MaterialEntity,
      ColorEntity,
      SizeEntity,
      ProductVariantEntity,
    ]),
  ],
})
export class ProductDetailsModule {}
