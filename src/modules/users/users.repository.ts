import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    const { email, passwordHash, passwordSalt } = createUserDto;

    const user = this.create({
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
}
