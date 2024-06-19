import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FollowersService } from './followers.service';
import { GetUser } from '~/common/decorators';
import { User } from '~/entities';

@ApiTags('Followers')
@Controller('users')
export class FollowersController {
  private readonly followersService: FollowersService;

  constructor(followersService: FollowersService) {
    this.followersService = followersService;
  }

  @Get('check-follow-status/:userId')
  @HttpCode(200)
  async checkFollowStatus(
    @GetUser() currentUser: User,
    @Param('userId') userId: string,
  ): Promise<boolean> {
    return this.followersService.checkFollowStatus(currentUser.id, userId);
  }

  @Post('follow/:userId')
  @HttpCode(200)
  async follow(
    @GetUser() currentUser: User,
    @Param('userId') userId: string,
  ): Promise<User> {
    return this.followersService.follow(currentUser.id, userId);
  }

  @HttpCode(200)
  @Delete('follow/:userId')
  async unFollow(
    @GetUser() currentUser: User,
    @Param('userId') userId: string,
  ): Promise<User> {
    return this.followersService.unFollow(currentUser.id, userId);
  }
}
