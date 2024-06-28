import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PublicRoute } from '~/common/decorators';
import { CategoryEntity, StyleEntity } from '~/entities';
import { ProductDetailsService } from './product-details.service';

@ApiTags('Product-Detail')
@Controller('product-details')
export class ProductDetailsController {
  private readonly productDetailsService: ProductDetailsService;

  constructor(productDetailsService: ProductDetailsService) {
    this.productDetailsService = productDetailsService;
  }

  @PublicRoute()
  @Get('/categories')
  async findAllCategoriesWithTypes(): Promise<CategoryEntity[]> {
    return this.productDetailsService.findAllCategoriesWithTypes();
  }

  @PublicRoute()
  @Get('/styles')
  async findAllStyles(): Promise<StyleEntity[]> {
    return this.productDetailsService.findAllStyles();
  }
}
