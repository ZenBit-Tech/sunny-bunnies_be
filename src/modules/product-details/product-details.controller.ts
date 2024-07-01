import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  BrandEntity,
  CategoryEntity,
  ColorEntity,
  MaterialEntity,
  SizeEntity,
  StyleEntity,
} from '~/entities';
import { ProductDetailsService } from './product-details.service';

@ApiTags('Product-Detail')
@Controller('product-details')
export class ProductDetailsController {
  private readonly productDetailsService: ProductDetailsService;

  constructor(productDetailsService: ProductDetailsService) {
    this.productDetailsService = productDetailsService;
  }

  @Get('/categories')
  async findAllCategoriesWithTypes(): Promise<CategoryEntity[]> {
    return this.productDetailsService.findAllCategoriesWithTypes();
  }

  @Get('/styles')
  async findAllStyles(): Promise<StyleEntity[]> {
    return this.productDetailsService.findAllStyles();
  }

  @Get('/brands')
  async findAllBrands(): Promise<BrandEntity[]> {
    return this.productDetailsService.findAllBrands();
  }

  @Get('/materials')
  async findAllMaterials(): Promise<MaterialEntity[]> {
    return this.productDetailsService.findAllMaterials();
  }

  @Get('/colors')
  async findAllColors(): Promise<ColorEntity[]> {
    return this.productDetailsService.findAllColors();
  }

  @Get('/sizes/:categoryId')
  async findAllSizes(
    @Param() param: { categoryId: number },
  ): Promise<SizeEntity[]> {
    const { categoryId } = param;
    return this.productDetailsService.findAllSizesByCategory(+categoryId);
  }
}
