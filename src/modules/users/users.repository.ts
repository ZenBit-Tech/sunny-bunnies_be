import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';

import { User, UserProfile, UserCard, UsersRating } from '~/entities';
import { UserCardDto, UserProfileUpdateDto } from './dto';
import { EncryptService } from '../auth/encrypt.service';
import { UpdateStatusDto } from '../admin/dto';

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
        deletedAt: IsNull(),
      },
      relations: ['profile'],
    });
  }

  async findVendorById(
    id: string,
  ): Promise<(User & { averageRating: number }) | null> {
    const vendor = await this.createQueryBuilder('user')
      .leftJoinAndSelect(
        'user.products',
        'products',
        'products.activityStatus = :activeStatus',
        { activeStatus: 'active' },
      )
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('user.reviewsReceived', 'reviewsReceived')
      .leftJoinAndSelect('reviewsReceived.reviewUser', 'reviewUser')
      .leftJoinAndSelect('reviewUser.profile', 'reviewUserProfile')
      .leftJoinAndMapOne(
        'reviewsReceived.rating',
        UsersRating,
        'rating',
        'rating.ratingUser = reviewsReceived.reviewUser AND rating.ratedUser = reviewsReceived.reviewedUser',
      )
      .addSelect(['reviewUserProfile.profilePhoto'])
      .leftJoinAndSelect('user.profile', 'profile')
      .where('user.id = :id', { id })
      .getOne();

    if (vendor) {
      const averageRating = await this.createQueryBuilder()
        .select('AVG(rating.rating)', 'averageRating')
        .from(UsersRating, 'rating')
        .where('rating.ratedUser.id = :id', { id })
        .getRawOne();

      return {
        ...vendor,
        averageRating: averageRating.averageRating,
      };
    }

    return null;
  }

  async createOne(
    payload: Pick<User, 'name' | 'email' | 'passwordHash' | 'passwordSalt'>,
  ): Promise<User> {
    const { name, email, passwordHash, passwordSalt } = payload;

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

  async updateStatus(
    userId: string,
    updateStatus: UpdateStatusDto,
  ): Promise<void> {
    await this.update(userId, { status: updateStatus.status });
  }

  async updateById(
    id: string,
    payload: Partial<Omit<User, 'id'>>,
  ): Promise<User> {
    return this.save({
      id,
      ...payload,
    });
  }

  async findAndSortUsers(
    order: 'ASC' | 'DESC',
    sortField: string,
    role: string,
    searchQuery: string,
  ): Promise<User[]> {
    const baseQuery = this.createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('profile.role = :role', { role })
      .andWhere('user.deletedAt IS NULL');

    if (sortField === 'addressLineOne') {
      baseQuery
        .andWhere(`profile.${sortField} LIKE :searchQuery`, {
          searchQuery: `%${searchQuery}%`,
        })
        .orderBy(`profile.${sortField}`, order);
    } else {
      baseQuery
        .andWhere(`user.${sortField} LIKE :searchQuery`, {
          searchQuery: `%${searchQuery}%`,
        })
        .orderBy(`user.${sortField}`, order);
    }

    return baseQuery.getMany();
  }
}
