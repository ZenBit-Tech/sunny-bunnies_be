import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { type UserProfile } from './user-profile.entity';
import { type UserCard } from './card.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  passwordHash: string;

  @Exclude()
  @Column()
  passwordSalt: string;

  @ApiProperty({ description: 'Created date of user' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated date of user' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne('UserCard', (card: UserCard) => card.user, {
    cascade: true,
  })
  card: UserCard;

  @OneToOne('UserProfile', (profile: UserProfile) => profile.user, {
    cascade: true,
  })
  profile: UserProfile;
}
