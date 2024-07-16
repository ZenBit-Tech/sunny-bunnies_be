import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ColorEntity } from '~/entities';

import { ColorsService } from './colors.service';

@ApiTags('Colors')
@Controller('colors')
export class ColorsController {
  private readonly colorsService: ColorsService;

  constructor(colorsService: ColorsService) {
    this.colorsService = colorsService;
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve a list of colors',
    description: 'This endpoint allows vendor to retrieve a list of colors.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of colors retrieved successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAll(): Promise<ColorEntity[]> {
    return this.colorsService.findAll();
  }
}
