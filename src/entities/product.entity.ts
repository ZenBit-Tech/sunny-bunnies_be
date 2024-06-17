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

import { Gender, ProductStatus } from '~/common/enums';
import { ImageEntity } from './image.entity';
import {
  BrandEntity,
  CategoryEntity,
  MaterialEntity,
  StyleEntity,
} from './index';
import { ProductVariantEntity } from './product-variant.entity';

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
  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'min_price' })
  minPrice: number;

  @ApiProperty({
    type: Number,
    description: 'This is the maximum price of the product',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'max_price' })
  maxPrice: number;

  @ApiProperty({
    type: [ImageEntity],
    description: 'Reference to the image entity',
  })
  @OneToMany(() => ImageEntity, (image) => image.product, { eager: true })
  images: ImageEntity[];

  @OneToMany(() => ProductVariantEntity, (variant) => variant.product, {
    eager: true,
    cascade: true,
  })
  variants: ProductVariantEntity[];

  @ApiProperty({
    type: Number,
    description: 'Reference to the category entity',
  })
  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
  // @ApiProperty({
  //   type: Number,
  //   description: 'Reference to the category entity',
  // })
  // @ManyToOne('CategoryEntity')
  // @JoinColumn({ name: 'category_id' })
  // category: 'CategoryEntity';

  // @ApiProperty({
  //   type: Number,
  //   description: 'Reference to the style entity',
  // })
  // @ManyToOne('StyleEntity')
  // @JoinColumn({ name: 'style_id' })
  // style: 'StyleEntity';
  @ApiProperty({
    type: Number,
    description: 'Reference to the style entity',
  })
  @ManyToOne(() => StyleEntity)
  @JoinColumn({ name: 'style_id' })
  style: StyleEntity;

  // @ApiProperty({
  //   type: Number,
  //   description: 'Reference to the brand entity',
  // })
  // @ManyToOne('BrandEntity')
  // @JoinColumn({ name: 'brand_id' })
  // brand: 'BrandEntity';
  @ApiProperty({
    type: Number,
    description: 'Reference to the brand entity',
  })
  @ManyToOne(() => BrandEntity)
  @JoinColumn({ name: 'brand_id' })
  brand: BrandEntity;

  // @ApiProperty({
  //   type: Number,
  //   description: 'Reference to the material entity',
  // })
  // @ManyToOne('MaterialEntity')
  // @JoinColumn({ name: 'material_id' })
  // material: 'MaterialEntity';
  @ApiProperty({
    type: Number,
    description: 'Reference to the material entity',
  })
  @ManyToOne(() => MaterialEntity)
  @JoinColumn({ name: 'material_id' })
  material: MaterialEntity;

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
