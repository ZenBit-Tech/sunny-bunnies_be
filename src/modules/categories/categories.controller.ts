import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoriesService.findAll();
  }
}
