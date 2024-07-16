import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SizeEntity } from '~/entities';

import { SizesService } from './sizes.service';

@ApiTags('Sizes')
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Get(':category')
  @ApiOperation({
    summary: 'Retrieve a list of sizes by category',
    description:
      'This endpoint allows vendor to retrieve a list of sizes based on category.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of sizes retrieved successfully',
    type: [SizeEntity],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findForCategory(
    @Param('category') category: string,
  ): Promise<SizeEntity[]> {
    return this.sizesService.findForCategory(category);
  }
}
