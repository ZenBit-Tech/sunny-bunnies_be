import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PublicRoute } from 'src/common/decorators';

import { ProductEntity } from '../../entities';
import { ProductsService } from './products.service';
import { GetProductsQueryDto } from './dto/get-products-query.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  private readonly productsService: ProductsService;

  constructor(productsService: ProductsService) {
    this.productsService = productsService;
  }

  @PublicRoute()
  @Get()
  async findAll(@Query() query: GetProductsQueryDto): Promise<ProductEntity[]> {
    return this.productsService.findAll(query);
  }
}
