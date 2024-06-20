import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '~/entities';
import {
  UserCreateRequestDto,
  UpdateUserDto,
  UserUpdatePasswordRequestDto,
  UserCardDto,
  UserProfileUpdateDto,
} from './dto';
import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/constants';
import { Encrypt } from '~/utils/encrypt.package';

@Injectable()
export class UsersService {
  private readonly usersRepository: UsersRepository;

  private readonly encryptService: Encrypt;

  constructor(usersRepository: UsersRepository, encryptService: Encrypt) {
    this.usersRepository = usersRepository;
    this.encryptService = encryptService;
  }

  async findById(userId: string): Promise<User> {
    return this.usersRepository.findById(userId);
  }

  async createOne(
    userCreateOneRequestDto: UserCreateRequestDto,
  ): Promise<User> {
    const { name, email, password } = userCreateOneRequestDto;

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
    updateUserPasswordDto: UserUpdatePasswordRequestDto,
  ): Promise<User> {
    const { password } = updateUserPasswordDto;

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
}
