import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './common/configs/typeorm.config';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfigAsync), TestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
