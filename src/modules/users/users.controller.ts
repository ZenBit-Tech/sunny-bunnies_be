import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { GetUser } from '~/common/decorators';
import { User } from '~/entities';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  private readonly usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  @Get('current')
  @HttpCode(200)
  getCurrent(@GetUser() user: User): User {
    return user;
  }

  @Get('vendor/:id')
  @HttpCode(200)
  getVendorById(@Param() param: { id: string }): Promise<User> {
    return this.usersService.findVendorById(param.id);
  }
}
