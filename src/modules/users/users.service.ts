import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersRepository } from './users.repository';
import { User } from '~/entities';
import {
  CreateUserDto,
  UserCardDto,
  UserProfileUpdateDto,
  UpdateUserDto,
} from './dto';
import { UpdateStatusDto } from '../admin/dto';

@Injectable()
export class UsersService {
  private readonly usersRepository: UsersRepository;

  private readonly mailerService: MailerService;

  constructor(usersRepository: UsersRepository, mailerService: MailerService) {
    this.usersRepository = usersRepository;
    this.mailerService = mailerService;
  }

  async findById(userId: string): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
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

  async updateStatus(
    userId: string,
    updateStatus: UpdateStatusDto,
  ): Promise<User> {
    const user = await this.usersRepository.findById(userId);
    const active = 'active';

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.updateStatus(userId, updateStatus);

    if (user.status === active) {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Black circle your account has been blocked',
        template: 'block-user',
        context: {
          name: user.name,
          userEmail: user.email,
        },
      });
    }

    return this.usersRepository.findById(userId);
  }

  async findAndSortUsers(
    order: 'ASC' | 'DESC',
    sortField: string,
    role: string,
    searchQuery: string,
  ): Promise<User[]> {
    return this.usersRepository.findAndSortUsers(
      order,
      sortField,
      role,
      searchQuery,
    );
  }

  async softDeleteUser(userId: string): Promise<void> {
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.deletedAt = new Date();
    await this.usersRepository.save(user);
  }
}
