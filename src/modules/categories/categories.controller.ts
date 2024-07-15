import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CategoryEntity } from '~/entities';

import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  private readonly categoriesService: CategoriesService;

  constructor(categoriesService: CategoriesService) {
    this.categoriesService = categoriesService;
  }

  @Get()
  @ApiOperation({
    summary:
      'Retrieve a list of categories with their types, brands, styles and materials',
    description:
      'This endpoint allows vendor to retrieve a list of categories.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of categories retrieved successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAll(): Promise<CategoryEntity[]> {
    return this.categoriesService.findAll();
  }
}
