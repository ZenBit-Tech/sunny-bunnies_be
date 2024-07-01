import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageEntity, ProductEntity, ProductVariantEntity } from '~/entities';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductVariantEntity,
      ImageEntity,
    ]),
  ],
})
export class ProductsModule {}
