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

import { RolesGuard } from './guard/roles.guard';
import { UsersService } from '../users/users.service';
import {
  SortableField,
  SortableOption,
  SortableRole,
} from './dto/sort-option.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { User } from '~/entities';

@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user/:id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch('update-status/:id')
  @HttpCode(200)
  async updateStatus(
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
  ) {
    return this.usersService.findAndSortUsers(
      order,
      sortField,
      role,
      searchQuery,
    );
  }
}
