import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsRepository } from './cats.repository';
import { Cat } from './cat.entity';

@Module({
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  imports: [TypeOrmModule.forFeature([Cat])],
})
export class CatsModule {}
