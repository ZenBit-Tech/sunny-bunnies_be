import { Body, Controller, Get, HttpCode, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUser } from '~/common/decorators';
import { ProductEntity, User } from '~/entities';
import { AddItemWishlistDto } from './dto';
import { WishlistService } from './wishlist.service';
import { GetWishProductsQueryDto } from './dto/get-products-query-dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Patch('add')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Add or remove a product to/from the wishlist',
    description:
      'Adds a product to the wishlist if not already present, otherwise removes it.',
  })
  @ApiResponse({
    status: 201,
    description: 'Product added to/removed from the wishlist successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'User or Product not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async addToWishlist(
    @GetUser() user: User,
    @Body() addToWishlistDto: AddItemWishlistDto,
  ): Promise<void> {
    return this.wishlistService.addToWishlist(
      user.id,
      addToWishlistDto.productId,
    );
  }

  @Get('/entire-wishlist')
  @ApiOperation({
    summary: 'Retrieve entire wishlist products',
    description: "Fetches all products in the user's wishlist.",
  })
  @ApiResponse({
    status: 200,
    description: 'List of all products in the wishlist retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Wishlist not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getEntireWishlistProducts(
    @GetUser() user: User,
  ): Promise<ProductEntity[]> {
    return this.wishlistService.getEntireWishlist(user.id);
  }

  @Get('/')
  @ApiOperation({
    summary: 'Retrieve paginated wishlist products',
    description:
      "Fetches products in the user's wishlist with pagination details.",
  })
  @ApiResponse({
    status: 200,
    description:
      'Paginated list of products in the wishlist retrieved successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Wishlist not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getWishlistProducts(
    @GetUser() user: User,
    @Query() query: GetWishProductsQueryDto,
  ): Promise<{
    products: ProductEntity[];
    totalCount: number;
    totalPages: number;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 12;

    return this.wishlistService.getWishlistProducts(user.id, page, limit);
  }
}
