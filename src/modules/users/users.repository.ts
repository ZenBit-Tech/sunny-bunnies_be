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
      role: null,
      phoneNumber: '',
      profilePhoto: null,
      addressLineOne: '',
      addressLineTwo: '',
      country: '',
      state: '',
      city: '',
      clothesSize: '',
      jeansSize: '',
      shoeSize: '',
      cardNumber: '',
      expireDate: '',
      cvvCode: '',
      isRegistrationCompleted: false,
    });

    await this.userProfileRepository.save(userProfile);

    return this.findOne({
      where: { id: user.id },
      relations: ['profile'],
    });
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
    userId: string,
    patchProfileDto: UserProfileUpdateDto,
  ): Promise<void> {
    await this.userProfileRepository.update(userId, patchProfileDto);
  }
}
