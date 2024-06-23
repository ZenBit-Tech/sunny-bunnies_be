import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'users_reviews' })
export class UsersReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  review: string;

  @ManyToOne('User', (user: User) => user.reviewsReceived, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reviewed_user_id' })
  reviewedUser: User;

  @ManyToOne('User', (user: User) => user.reviewsGiven, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'review_user_id' })
  reviewUser: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
