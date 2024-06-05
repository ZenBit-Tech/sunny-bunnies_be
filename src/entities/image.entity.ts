import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'product_images' })
export class ImageEntity {
  @ApiProperty({
    type: Number,
    description: 'This is the unique identifier for the image',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'This is the URL of the image',
  })
  @Column({ type: 'text' })
  url: string;

  @ApiProperty({
    type: String,
    description: 'This is a description of the image',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    type: String,
    description: 'This is the creation date of the image record',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
