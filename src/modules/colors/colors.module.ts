import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColorEntity } from '~/entities';

import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import { ColorsRepository } from './colors.repository';

@Module({
  controllers: [ColorsController],
  providers: [ColorsService, ColorsRepository],
  imports: [TypeOrmModule.forFeature([ColorEntity])],
})
export class ColorsModule {}
