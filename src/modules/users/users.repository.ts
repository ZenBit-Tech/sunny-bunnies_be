import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../entities';
import { CreateUserDto } from './dto';

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

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, passwordHash, passwordSalt } = createUserDto;

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

  async patchById(id: string, payload: Partial<User>): Promise<User> {
    return this.save({
      id,
      ...payload,
    });
  }
}
