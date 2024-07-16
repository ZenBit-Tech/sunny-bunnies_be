import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BrandEntity,
  CategoryEntity,
  ColorEntity,
  ImageEntity,
  MaterialEntity,
  ProductEntity,
  ProductVariantEntity,
  SizeEntity,
  StyleEntity,
} from '~/entities';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeEntity } from '~/entities/type.entity';
import { UsersModule } from '../users/users.module';
import { UploadModule } from '~/modules/upload/upload.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductVariantEntity,
      ImageEntity,
      CategoryEntity,
      TypeEntity,
      StyleEntity,
      BrandEntity,
      MaterialEntity,
      ColorEntity,
      SizeEntity,
    ]),
    UsersModule,
    UploadModule,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
