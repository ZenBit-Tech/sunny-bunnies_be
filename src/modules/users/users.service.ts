import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '~/entities';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  private readonly usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async findById(userId: string): Promise<User> {
    return this.usersRepository.findById(userId);
  }

  async findVendorById(userId: string): Promise<User> {
    return this.usersRepository.findVendorById(userId);
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

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.updateById(id, updateUserDto);
  }
}
