import { Module } from '@nestjs/common';

import { FiltersController } from './filters.controller';
import { FiltersService } from './filters.service';
import { FiltersRepository } from './filters.repository';

@Module({
  imports: [],
  controllers: [FiltersController],
  providers: [FiltersService, FiltersRepository],
})
export class FiltersModule {}
