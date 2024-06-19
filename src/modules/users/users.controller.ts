import { Body, Controller, Get, HttpCode, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { GetUser } from '~/common/decorators';
import { User } from '~/entities';
import { UserProfileUpdateDto, UserCardDto } from './dto/index';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  private readonly usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  @Get('current')
  @HttpCode(200)
  getCurrent(@GetUser() user: User): Promise<User> {
    return this.usersService.findById(user.id);
  }

  @Get('vendor/:id')
  @HttpCode(200)
  getVendorById(@Param() param: { id: string }): Promise<User> {
    return this.usersService.findVendorById(param.id);
  }

  @Patch('update')
  @HttpCode(200)
  async updateProfile(
    @GetUser() user: User,
    @Body() updateProfileDto: UserProfileUpdateDto,
  ): Promise<User> {
    return this.usersService.updateProfile(user.id, updateProfileDto);
  }

  @Patch('update-card')
  @HttpCode(200)
  async updateCard(
    @GetUser() user: User,
    @Body() updateCardDto: UserCardDto,
  ): Promise<User> {
    return this.usersService.updateCard(user.id, updateCardDto);
  }
}
