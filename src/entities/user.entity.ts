import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { type UserCard } from './card.entity';
import { type ProductEntity } from './product.entity';
import { type UsersRating } from './users-rating.entity';
import { type UsersReview } from './users-review.entity';
import { type UserProfile } from './user-profile.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Exclude()
  @Column({ name: 'password_salt' })
  passwordSalt: string;

  @Column({ type: 'boolean', default: false, name: 'is_verified' })
  isVerified: boolean;

  @Exclude()
  @Column({ name: 'otp_token', nullable: true })
  otpToken: string | null;

  @ApiProperty({ description: 'Created date of user' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated date of user' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany('ProductEntity', (product: ProductEntity) => product.user)
  products: ProductEntity[];

  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable({
    name: 'user_followers',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'follower_id',
      referencedColumnName: 'id',
    },
  })
  followers: User[];

  @ManyToMany(() => User, (user) => user.following)
  following: User[];

  @OneToOne('UserCard', (card: UserCard) => card.user, {
    cascade: true,
  })
  card: UserCard;

  @OneToOne('UserProfile', (profile: UserProfile) => profile.user, {
    cascade: true,
  })
  profile: UserProfile;

  @OneToMany('UsersRating', (rating: UsersRating) => rating.ratedUser)
  ratingsReceived: UsersRating[];

  @OneToMany('UsersRating', (rating: UsersRating) => rating.ratingUser)
  ratingsGiven: UsersRating[];

  @OneToMany('UsersReview', (review: UsersReview) => review.reviewedUser)
  reviewsReceived: UsersReview[];

  @OneToMany('UsersReview', (review: UsersReview) => review.reviewUser)
  reviewsGiven: UsersReview[];
}
