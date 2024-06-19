import { Injectable } from '@nestjs/common';
import { FollowersRepository } from './followers.repository';
import { User } from '~/entities';

@Injectable()
export class FollowersService {
  private readonly followersRepository: FollowersRepository;

  constructor(followersRepository: FollowersRepository) {
    this.followersRepository = followersRepository;
  }

  async checkFollowStatus(userId: string, targetId: string): Promise<boolean> {
    return this.followersRepository.checkFollowStatus(userId, targetId);
  }

  async follow(userId: string, targetId: string): Promise<User> {
    return this.followersRepository.follow(userId, targetId);
  }

  async unFollow(userId: string, targetId: string): Promise<User> {
    return this.followersRepository.unFollow(userId, targetId);
  }
}
