import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FollowersService } from './followers.service';
import { GetUser, PublicRoute } from '~/common/decorators';
import { User } from '~/entities';

@ApiTags('Followers')
@Controller('followers')
export class FollowersController {
  private readonly followersService: FollowersService;

  constructor(followersService: FollowersService) {
    this.followersService = followersService;
  }

  @PublicRoute()
  @Post('follow/:targetId')
  @HttpCode(200)
  async follow(
    @GetUser() currentUser: User,
    @Param('targetId') targetId: string,
  ): Promise<User> {
    return this.followersService.follow(currentUser.id, targetId);
  }

  @PublicRoute()
  @HttpCode(200)
  @Delete('unfollow/:targetId')
  async unFollow(
    @GetUser() currentUser: User,
    @Param('targetId') targetId: string,
  ): Promise<User> {
    return this.followersService.unFollow(currentUser.id, targetId);
  }

  @PublicRoute()
  @Get('followers')
  @HttpCode(200)
  async getFollowers(@GetUser() currentUser: User): Promise<User[]> {
    return this.followersService.getFollowers(currentUser.id);
  }

  @PublicRoute()
  @Get('following')
  @HttpCode(200)
  async getFollowing(@GetUser() currentUser: User): Promise<User[]> {
    return this.followersService.getFollowing(currentUser.id);
  }
}
