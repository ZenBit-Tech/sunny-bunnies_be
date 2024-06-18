import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { User } from '~/entities';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<User> {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  async findVendorById(id: string): Promise<User> {
    return this.findOne({
      where: {
        id,
      },
      relations: ['products'],
    });
  }

  async createOne(
    payload: Pick<User, 'name' | 'email' | 'passwordHash' | 'passwordSalt'>,
  ): Promise<User> {
    const { name, email, passwordHash, passwordSalt } = payload;

    const user = this.create({
      name,
      email,
      passwordSalt,
      passwordHash,
    });
    await this.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.findOne({
      where: {
        email,
      },
    });
  }

  async updateById(
    id: string,
    payload: Partial<Omit<User, 'id'>>,
  ): Promise<User> {
    return this.save({
      id,
      ...payload,
    });
  }
}
