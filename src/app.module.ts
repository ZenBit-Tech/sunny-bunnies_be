import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './common/configs/typeorm.config';
import { TestModule } from './modules/test/test.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    TestModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
