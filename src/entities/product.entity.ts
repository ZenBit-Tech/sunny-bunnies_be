import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ImageEntity } from './image.entity';
import { SizeEntity } from './size.entity';
import { CategoryEntity } from './category.entity';
import { ColorEntity } from './colors.entity';
import { StyleEntity } from './style.entity';
import { BrandEntity } from './brand.entity';
import { MaterialEntity } from './material.entity';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum ProductStatus {
  ForSale = 'forSale',
  ForRent = 'forRent',
  Both = 'both',
}

@Entity({ name: 'product' })
export class ProductEntity {
  @ApiProperty({
    type: Number,
    description: 'This is an id that identifies a test entity',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'This is the name of the product',
  })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({
    type: String,
    description: 'This is the description of the product',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    type: Number,
    description: 'This is the quantity of the product',
  })
  @Column({ type: 'int' })
  quantity: number;

  @ApiProperty({
    type: String,
    enum: Gender,
    description: 'This is the gender of the product',
  })
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @ApiProperty({
    type: String,
    enum: ProductStatus,
    description:
      'This is the status of the product (for sale, for rent, or both)',
  })
  @Column({ type: 'enum', enum: ProductStatus })
  status: ProductStatus;

  @ApiProperty({
    type: Number,
    description: 'This is the minimum price of the product',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'price_from' })
  priceFrom: number;

  @ApiProperty({
    type: Number,
    description: 'This is the maximum price of the product',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'price_to' })
  priceTo: number;

  @ApiProperty({
    type: Number,
    description: 'This is the time when product was created',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    type: Number,
    description: 'This is the time when product was updated',
  })
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({
    type: Number,
    description: 'Reference to the image entity',
  })
  @ManyToOne(() => ImageEntity)
  @JoinColumn({ name: 'image_id' })
  image: ImageEntity;

  @ApiProperty({
    type: Number,
    description: 'Reference to the size entity',
  })
  @ManyToOne(() => SizeEntity)
  @JoinColumn({ name: 'size_id' })
  size: SizeEntity;

  @ApiProperty({
    type: Number,
    description: 'Reference to the category entity',
  })
  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ApiProperty({
    type: Number,
    description: 'Reference to the color entity',
  })
  @ManyToOne(() => ColorEntity)
  @JoinColumn({ name: 'color_id' })
  color: ColorEntity;

  @ApiProperty({
    type: Number,
    description: 'Reference to the style entity',
  })
  @ManyToOne(() => StyleEntity)
  @JoinColumn({ name: 'style_id' })
  style: StyleEntity;

  @ApiProperty({
    type: Number,
    description: 'Reference to the brand entity',
  })
  @ManyToOne(() => BrandEntity)
  @JoinColumn({ name: 'brand_id' })
  brand: BrandEntity;

  @ApiProperty({
    type: Number,
    description: 'Reference to the material entity',
  })
  @ManyToOne(() => MaterialEntity)
  @JoinColumn({ name: 'material_id' })
  material: MaterialEntity;
}
