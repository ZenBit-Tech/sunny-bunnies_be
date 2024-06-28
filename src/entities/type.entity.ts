import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'This is the id of the category to which the type belongs',
  })
  @Column()
  category_id: number;

  @ManyToOne('CategoryEntity', (category: CategoryEntity) => category.types)
  category: CategoryEntity;
}
