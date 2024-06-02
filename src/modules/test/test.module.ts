import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TestRepository } from './test.repository';
import { TestEntity } from '../../entities';

@Module({
  controllers: [TestController],
  providers: [TestService, TestRepository],
  imports: [TypeOrmModule.forFeature([TestEntity])],
})
export class TestModule {}
