import { Controller, UseGuards, Get, Query } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from './guard/roles.guard';

import { ProductEntity, User } from '~/entities';
import { ProductsService } from '../products/products.service';
import { GetVendorsProductsQueryDto } from './dto';
import { GetUser } from '~/common/decorators';

@ApiTags('Vendor')
@Controller('vendor')
@UseGuards(RolesGuard)
export class VendorsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('products')
  @ApiOperation({
    summary: 'Retrieve a list of products',
    description:
      'This endpoint allows admins to retrieve a list of products along with pagination details.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of products retrieved successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAllProducts(
    @GetUser() user: User,
    @Query() query: GetVendorsProductsQueryDto,
  ): Promise<{
    products: ProductEntity[];
    totalCount: number;
    totalPages: number;
  }> {
    return this.productsService.fintAllVendorsProduct(query, user.id);
  }
}
