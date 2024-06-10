import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { User, UserProfile } from '../../entities';
import { CreateUserDto } from './dto';
import { UserProfileUpdateDto } from './dto/user-profile-update.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  private readonly userProfileRepository: Repository<UserProfile>;

  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
    this.userProfileRepository = dataSource.getRepository(UserProfile);
  }

  async findById(id: string): Promise<User> {
    return this.findOne({
      where: {
        id,
      },
      relations: ['profile'],
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

    const userProfile = this.userProfileRepository.create({
      user_id: user.id,
      role: 'buyer',
      phone_number: '',
      profile_photo: '',
      address_line_1: '',
      address_line_2: '',
      country: '',
      state: '',
      city: '',
      clothes_size: '',
      jeans_size: '',
      shoe_size: '',
      card_number: '',
      expire_date: '',
      cvv_code: '',
    });

    await this.userProfileRepository.save(userProfile);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.findOne({
      where: {
        email,
      },
      relations: ['profile'],
    });
  }

  async updateProfile(
    user: User,
    patchProfileDto: UserProfileUpdateDto,
  ): Promise<void> {
    await this.userProfileRepository.update(user.profile.id, patchProfileDto);
  }
}
