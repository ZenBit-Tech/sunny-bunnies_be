import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity({ name: 'users_rating' })
export class UsersRating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('User', (user: User) => user.ratingsReceived)
  ratedUser: User;

  @ManyToOne('User', (user: User) => user.ratingsGiven)
  ratingUser: User;

  @Column({ type: 'int' })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
