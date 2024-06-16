import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { ProductEntity } from '~/entities';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
})
export class ProductsModule {}
