import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PublicRoute } from '~/common/decorators';
import { ProductEntity } from '~/entities';

import { ProductsService } from './products.service';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { CreateProductDto } from '~/modules/products/dto/create-product.dto';
import { GetCurrentUser } from '~/common/decorators/get-user.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  private readonly productsService: ProductsService;

  constructor(productsService: ProductsService) {
    this.productsService = productsService;
  }

  @PublicRoute()
  @Get()
  async findAll(@Query() query: GetProductsQueryDto): Promise<{
    products: ProductEntity[];
    totalCount: number;
    totalPages: number;
  }> {
    return this.productsService.findAll(query);
  }

  @PublicRoute()
  @Get('/:id')
  async findById(@Param() param: { id: string }): Promise<ProductEntity> {
    return this.productsService.findById(param.id);
  }

  @PublicRoute()
  @Post()
  @HttpCode(201)
  async createProduct(
    @GetCurrentUser() user,
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productsService.createProduct(createProductDto, user.userId);
  }
}
