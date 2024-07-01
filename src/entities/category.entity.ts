import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { type SizeEntity, type TypeEntity } from './index';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @ApiProperty({
    type: Number,
    description: 'This is an id that identifies a category entity',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'This is the name of the category',
  })
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany('TypeEntity', (type: TypeEntity) => type.category)
  types: TypeEntity[];

  @ManyToMany('SizeEntity', (size: SizeEntity) => size.categories)
  @JoinTable({
    name: 'sizes_categories',
    joinColumn: { name: 'categoryId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'sizeId', referencedColumnName: 'id' },
  })
  sizes: SizeEntity[];
}
