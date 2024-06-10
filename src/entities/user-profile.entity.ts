import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity({ name: 'user_profiles' })
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column({ type: 'enum', enum: ['buyer', 'vendor'] })
  role: 'buyer' | 'vendor';

  @Column()
  phone_number: string;

  @Column()
  profile_photo: string;

  @Column()
  address_line_1: string;

  @Column()
  address_line_2: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  clothes_size: string;

  @Column()
  jeans_size: string;

  @Column()
  shoe_size: string;

  @Column()
  card_number: string;

  @Column()
  expire_date: string;

  @Column()
  cvv_code: string;

  @ApiProperty({ description: 'Created date of user profile' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated date of user profile' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
