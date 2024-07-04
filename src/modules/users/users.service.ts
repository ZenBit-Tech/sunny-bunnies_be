import { MailerService } from '@nestjs-modules/mailer';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '~/entities';
import {
  UserCreateDto,
  UpdateUserDto,
  UserUpdatePasswordDto,
  UserCardDto,
  UserProfileUpdateDto,
  UpdateUserAndProfileDto,
} from './dto';
import { UpdateStatusDto } from '../admin/dto';
import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/constants';
import { Encrypt } from '~/utils/encrypt.package';

@Injectable()
export class UsersService {
  private readonly usersRepository: UsersRepository;

  private readonly mailerService: MailerService;

  private readonly encryptService: Encrypt;

  constructor(
    usersRepository: UsersRepository,
    encryptService: Encrypt,
    mailerService: MailerService,
  ) {
    this.usersRepository = usersRepository;
    this.mailerService = mailerService;
    this.encryptService = encryptService;
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

  async createOne(userCreateDto: UserCreateDto): Promise<User> {
    const { name, email, password } = userCreateDto;

    const passwordSalt = await this.encryptService.generateSalt(
      USER_PASSWORD_SALT_ROUNDS,
    );

    const passwordHash = await this.encryptService.encrypt(
      password,
      passwordSalt,
    );

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

  async updatePassword(
    id: string,
    userUpdatePasswordDto: UserUpdatePasswordDto,
  ): Promise<User> {
    const { password } = userUpdatePasswordDto;

    const user = await this.findById(id);

    const hasSamePassword = await this.encryptService.compare({
      data: password,
      passwordHash: user.passwordHash,
      salt: user.passwordSalt,
    });

    if (hasSamePassword) {
      throw new ConflictException('Password can not be the same');
    }

    const passwordSalt = await this.encryptService.generateSalt(
      USER_PASSWORD_SALT_ROUNDS,
    );

    const passwordHash = await this.encryptService.encrypt(
      password,
      passwordSalt,
    );

    return this.updateById(id, {
      passwordSalt,
      passwordHash,
    });
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
    page: number,
    limit: number,
  ): Promise<{ users: User[]; totalCount: number; totalPages: number }> {
    const { users, totalCount } = await this.usersRepository.findAndSortUsers(
      order,
      sortField,
      role,
      searchQuery,
      page,
      limit,
    );

    const totalPages = Math.ceil(totalCount / limit);

    return { users, totalCount, totalPages };
  }

  async softDeleteUser(userId: string): Promise<void> {
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.deletedAt = new Date();
    await this.usersRepository.save(user);
  }

  async updateUserAndProfile(
    userId: string,
    updateUserAndProfileDto: UpdateUserAndProfileDto,
  ): Promise<User> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { profile, ...updateUserDto } = updateUserAndProfileDto;

    await this.usersRepository.updateById(userId, updateUserDto);

    if (profile) {
      await this.usersRepository.updateProfile(userId, profile);
    }

    return this.usersRepository.findById(userId);
  }
}
