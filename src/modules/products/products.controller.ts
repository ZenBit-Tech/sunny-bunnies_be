import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PublicRoute } from '~/common/decorators';
import { ProductEntity } from '~/entities';

import { ProductsService } from './products.service';
import { CreateProductDto, GetProductsQueryDto } from './dto/index';

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

  @PublicRoute()
  @Get('/:id')
  async findById(@Param() param: { id: number }): Promise<ProductEntity> {
    return this.productsService.findById(param.id);
  }

  @PublicRoute()
  @Post('/')
  async create(@Body() body: CreateProductDto): Promise<ProductEntity> {
    return this.productsService.create(body);
  }
}
