import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '../../entities';
import { CreateUserDto, UserCardDto, UserProfileUpdateDto } from './dto';

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

  async updateCard(userId: string, updateData: UserCardDto): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.updateCard(user, updateData);

    return this.usersRepository.findById(userId);
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UserProfileUpdateDto,
  ): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.updateProfile(user.id, updateProfileDto);

    return this.usersRepository.findById(userId);
  }
}
