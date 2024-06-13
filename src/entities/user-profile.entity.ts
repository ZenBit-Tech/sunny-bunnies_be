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

  @Column({ type: 'enum', enum: ['buyer', 'vendor', 'admin'], nullable: true })
  role: 'buyer' | 'vendor' | 'admin' | null;

  @Column()
  phoneNumber: string;

  @Column()
  profilePhoto: string;

  @Column()
  addressLineOne: string;

  @Column()
  addressLineTwo: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  clothesSize: string;

  @Column()
  jeansSize: string;

  @Column()
  shoeSize: string;

  @Column()
  cardNumber: string;

  @Column()
  expireDate: string;

  @Column()
  cvvCode: string;

  @Column()
  isRegistrationCompleted: boolean;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ description: 'Created date of user profile' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated date of user profile' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
