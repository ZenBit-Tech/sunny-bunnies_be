import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '../../entities';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  private readonly usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async findById(userId: string): Promise<User> {
    return this.usersRepository.findById(userId);
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, passwordHash, passwordSalt } = createUserDto;

    return this.usersRepository.createOne({
      name,
      email,
      passwordHash,
      passwordSalt,
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findByEmail(email);
  }
}
