import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { User, UserProfile, UserCard } from '../../entities';
import { CreateUserDto, UserCardDto, UserProfileUpdateDto } from './dto';
import { EncryptService } from '../auth/encrypt.service';

@Injectable()
export class UsersRepository extends Repository<User> {
  private readonly userProfileRepository: Repository<UserProfile>;

  private readonly userCardRepository: Repository<UserCard>;

  private readonly encryptService: EncryptService;

  constructor(dataSource: DataSource, encryptService: EncryptService) {
    super(User, dataSource.createEntityManager());
    this.userProfileRepository = dataSource.getRepository(UserProfile);
    this.userCardRepository = dataSource.getRepository(UserCard);
    this.encryptService = encryptService;
  }

  async findById(id: string): Promise<User> {
    return this.findOne({
      where: {
        id,
      },
      relations: ['profile', 'card'],
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
      isRegistrationCompleted: false,
    });

    await this.userProfileRepository.save(userProfile);

    const userCard: Partial<UserCard> = {
      user_id: user.id,
      cardNumber: '',
      expireDate: '',
      cvvCode: '',
    };
    await this.userCardRepository.save(userCard);

    await this.userCardRepository.save(userCard);

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

  async updateCard(user: User, updateData: UserCardDto): Promise<void> {
    const encryptedCardNumber = await this.encryptService.encrypt(
      updateData.cardNumber,
      user.passwordSalt,
    );
    const encryptedCvvCode = await this.encryptService.encrypt(
      updateData.cvvCode,
      user.passwordSalt,
    );
    const encryptedExpireDate = await this.encryptService.encrypt(
      updateData.expireDate,
      user.passwordSalt,
    );

    await this.userCardRepository.update(
      { user_id: user.id },
      {
        cardNumber: encryptedCardNumber,
        cvvCode: encryptedCvvCode,
        expireDate: encryptedExpireDate,
      },
    );
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UserProfileUpdateDto,
  ): Promise<void> {
    await this.userProfileRepository.update(
      { user_id: userId },
      updateProfileDto,
    );
  }
}
