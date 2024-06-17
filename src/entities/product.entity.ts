import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Gender, ProductStatus } from '../common/enums';
import {
  type BrandEntity,
  type CategoryEntity,
  type ImageEntity,
  type MaterialEntity,
  type ProductVariantEntity,
  type StyleEntity,
  type User,
} from './index';

@Entity({ name: 'products' })
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
  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'min_price' })
  minPrice: number;

  @ApiProperty({
    type: Number,
    description: 'This is the maximum price of the product',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'max_price' })
  maxPrice: number;

  @ApiProperty({
    description: 'Reference to the image entity',
  })
  @OneToMany('ImageEntity', (image: ImageEntity) => image.product, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'product_id' })
  images: ImageEntity[];

  @OneToMany(
    'ProductVariantEntity',
    (variant: ProductVariantEntity) => variant.product,
    {
      eager: true,
      cascade: true,
    },
  )
  variants: ProductVariantEntity[];

  @ApiProperty({
    type: Number,
    description: 'Reference to the category entity',
  })
  @ManyToOne('CategoryEntity')
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ApiProperty({
    type: Number,
    description: 'Reference to the style entity',
  })
  @ManyToOne('StyleEntity')
  @JoinColumn({ name: 'style_id' })
  style: StyleEntity;

  @ApiProperty({
    type: Number,
    description: 'Reference to the brand entity',
  })
  @ManyToOne('BrandEntity')
  @JoinColumn({ name: 'brand_id' })
  brand: BrandEntity;

  @ApiProperty({
    type: Number,
    description: 'Reference to the material entity',
  })
  @ManyToOne('MaterialEntity')
  @JoinColumn({ name: 'material_id' })
  material: MaterialEntity;

  @ApiProperty({
    type: Number,
    description: 'Reference to the user entity (vendor)',
  })
  @ManyToOne('User', (user: User) => user.products)
  @JoinColumn({ name: 'user_id' })
  user: User;

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
}
