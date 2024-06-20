import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity({ name: 'user_card' })
export class UserCard {
  @PrimaryGeneratedColumn('uuid')
  card_id: string;

  @Column('uuid')
  user_id: string;

  @Column()
  cardNumber: string;

  @Column()
  expireDate: string;

  @Column()
  cvvCode: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ description: 'Created date of user card' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated date of user card' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
