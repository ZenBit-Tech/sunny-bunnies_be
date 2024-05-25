import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './common/configs/typeorm.config';
import { CatsModule } from './modules/cats/cats.module';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfigAsync), CatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
