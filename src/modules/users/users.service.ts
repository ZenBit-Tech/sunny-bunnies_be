import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '~/entities';
import {
  CreateUserDto,
  UserCardDto,
  UserProfileUpdateDto,
  UpdateUserDto,
  UpdateUserAndProfileDto,
} from './dto';

@Injectable()
export class UsersService {
  private readonly usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async findById(userId: string): Promise<User> {
    return this.usersRepository.findById(userId);
  }

  async findVendorById(userId: string): Promise<User | null> {
    const vendor = await this.usersRepository.findVendorById(userId);

    if (!vendor) {
      throw new NotFoundException('Vendor with this id was not found');
    }

    return vendor;
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

  async updateProfilePhoto(userId: string, photoUrl: string): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.updateProfile(user.id, {
      profilePhoto: photoUrl,
    });

    return this.usersRepository.findById(userId);
  }

  async updateUserAndProfile(
    userId: string,
    updateUerAndProfileDto: UpdateUserAndProfileDto,
  ): Promise<User> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { profile, ...updateUserDto } = updateUerAndProfileDto;

    await this.usersRepository.updateById(userId, updateUserDto);

    if (profile) {
      await this.usersRepository.updateProfile(userId, profile);
    }

    return this.usersRepository.findById(userId);
  }
}
