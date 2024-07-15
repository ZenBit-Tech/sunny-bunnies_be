import { Module } from '@nestjs/common';
import { VendorsController } from './vendors.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [VendorsController],
})
export class VendorsModule {}
