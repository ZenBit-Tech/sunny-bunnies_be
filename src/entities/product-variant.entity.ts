import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ColorEntity } from './colors.entity';
import { ProductEntity } from './product.entity';
import { SizeEntity } from './size.entity';

@Entity({ name: 'product_variants' })
export class ProductVariantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => ProductEntity, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => SizeEntity, { eager: true })
  @JoinColumn({ name: 'size_id' })
  size: SizeEntity;

  @ManyToOne(() => ColorEntity, { eager: true })
  @JoinColumn({ name: 'color_id' })
  color: ColorEntity;

  // @ManyToOne('ProductEntity', 'variants', {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'product_id' })
  // product: 'ProductEntity';

  // @ManyToOne('SizeEntity', { eager: true })
  // @JoinColumn({ name: 'size_id' })
  // size: 'SizeEntity';

  // @ManyToOne('ColorEntity', { eager: true })
  // @JoinColumn({ name: 'color_id' })
  // color: 'ColorEntity';
}
