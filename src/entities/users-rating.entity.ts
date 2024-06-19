import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
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

  @CreateDateColumn()
  updatedAt: Date;
}
