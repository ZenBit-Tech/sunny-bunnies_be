import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { type CategoryEntity } from './category.entity';

@Entity({ name: 'sizes' })
export class SizeEntity {
  @ApiProperty({
    type: Number,
    description: 'This is an id that identifies a size entity',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'This is the name of the size',
  })
  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany('CategoryEntity', (category: CategoryEntity) => category.sizes)
  @JoinTable({
    name: 'sizes_categories',
    joinColumn: { name: 'sizeId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' },
  })
  categories: CategoryEntity[];
}
