import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PublicRoute } from 'src/common/decorators';

import { FiltersService } from './filters.service';

@ApiTags('Filters')
@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @PublicRoute()
  @Get()
  async getAllFilters() {
    return this.filtersService.getAllFilters();
  }
}
