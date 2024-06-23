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

  @Column('uuid')
  user_id: string;

  @Column({ type: 'enum', enum: ['buyer', 'vendor', 'admin'], nullable: true })
  role: 'buyer' | 'vendor' | 'admin' | null;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'profile_photo', nullable: true })
  profilePhoto: string | null;

  @Column({ name: 'address_line_one' })
  addressLineOne: string;

  @Column({ name: 'address_line_two' })
  addressLineTwo: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column({ name: 'clothes_size' })
  clothesSize: string;

  @Column({ name: 'jeans_size' })
  jeansSize: string;

  @Column({ name: 'shoe_size' })
  shoeSize: string;

  @Column({ name: 'is_registration_completed' })
  isRegistrationCompleted: boolean;

  @OneToOne(() => User, (user) => user.profile, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ description: 'Created date of user profile' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated date of user profile' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
