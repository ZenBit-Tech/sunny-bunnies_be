import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { type ProductEntity } from './product.entity';

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
    type: Boolean,
    description: 'This property set image primary or not',
  })
  @Column({ type: 'boolean' })
  isPrimary: boolean;

  @ManyToOne('ProductEntity', (product: ProductEntity) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ApiProperty({
    type: String,
    description: 'This is the creation date of the image record',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
