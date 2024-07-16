import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SizeEntity } from '~/entities';

import { SizesController } from './sizes.controller';
import { SizesService } from './sizes.service';
import { SizesRepository } from './sizes.repository';

@Module({
  controllers: [SizesController],
  providers: [SizesService, SizesRepository],
  imports: [TypeOrmModule.forFeature([SizeEntity])],
})
export class SizesModule {}
