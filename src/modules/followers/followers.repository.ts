import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '~/entities';

@Injectable()
export class FollowersRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async checkFollowStatus(userId: string, targetId: string): Promise<boolean> {
    const user = await this.findOne({
      where: { id: userId },
      relations: ['following'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.following.some((following) => following.id === targetId);
  }

  async follow(userId: string, targetId: string): Promise<User> {
    const user = await this.findOne({
      where: { id: userId },
      relations: ['following'],
    });

    const target = await this.findOne({
      where: { id: targetId },
    });

    if (!user || !target) {
      throw new NotFoundException('User not found');
    }

    if (!user.following.some((following) => following.id === targetId)) {
      user.following.push(target);
    }

    return this.save(user);
  }

  async unFollow(userId: string, targetId: string): Promise<User> {
    const user = await this.findOne({
      where: { id: userId },
      relations: ['following'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.following = user.following.filter(
      (following) => following.id !== targetId,
    );

    return this.save(user);
  }
}
