import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ProductEntity } from './product.entity';

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

  @ManyToOne(() => ProductEntity, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
  // @ManyToOne('ProductEntity', 'images', {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'product_id' })
  // product: 'ProductEntity';

  @ApiProperty({
    type: String,
    description: 'This is the creation date of the image record',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
