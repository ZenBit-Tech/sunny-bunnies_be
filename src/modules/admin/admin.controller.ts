import {
  Controller,
  UseGuards,
  Get,
  Query,
  Param,
  Body,
  HttpCode,
  Patch,
  Delete,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from './guard/roles.guard';
import { UsersService } from '../users/users.service';
import {
  GetAdminProductsQueryDto,
  SortableField,
  SortableOption,
  SortableRole,
  UpdateStatusDto,
} from './dto/index';
import { ProductEntity, User } from '~/entities';
import { ProductsService } from '../products/products.service';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Patch('update-status/:id')
  @HttpCode(200)
  async updateUserStatus(
    @Param('id') userId: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<User> {
    return this.usersService.updateStatus(userId, updateStatusDto);
  }

  @Delete('user/:id')
  @HttpCode(204)
  async softDeleteUser(@Param('id') userId: string): Promise<void> {
    await this.usersService.softDeleteUser(userId);
  }

  @Get('users')
  async findAllUsers(
    @Query('order') order: SortableOption,
    @Query('sortField') sortField: SortableField,
    @Query('role') role: SortableRole,

    @Query('searchQuery') searchQuery?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 7,
  ): Promise<{ users: User[]; totalCount: number; totalPages: number }> {
    return this.usersService.findAndSortUsers(
      order,
      sortField,
      role,
      searchQuery,
      page,
      limit,
    );
  }

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
  async findAllProducts(@Query() query: GetAdminProductsQueryDto): Promise<{
    products: ProductEntity[];
    totalCount: number;
    totalPages: number;
  }> {
    return this.productsService.findAll(query);
  }
}
