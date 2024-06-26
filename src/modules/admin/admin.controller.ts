import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { RolesGuard } from './guard/roles.guard';
import { UsersService } from '../users/users.service';
import {
  SortableField,
  SortableOption,
  SortableRole,
} from './dto/sort-option.dto';

@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

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
