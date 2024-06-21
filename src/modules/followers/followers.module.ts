import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowersController } from './followers.controller';
import { FollowersService } from './followers.service';
import { FollowersRepository } from './followers.repository';
import { User } from '~/entities';

@Module({
  controllers: [FollowersController],
  providers: [FollowersService, FollowersRepository],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [FollowersService],
})
export class FollowersModule {}
