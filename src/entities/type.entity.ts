import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { type CategoryEntity } from './category.entity';

@Entity({ name: 'types' })
export class TypeEntity {
  @ApiProperty({
    type: Number,
    description: 'This is an id that identifies a type entity',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'This is the name of the type',
  })
  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne('CategoryEntity', (category: CategoryEntity) => category.types)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ApiProperty({
    type: Number,
    description: 'This is the id of the category to which the type belongs',
  })
  @Column({ name: 'category_id' })
  categoryId: number;
}
