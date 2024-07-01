import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { type TypeEntity } from './index';

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
}
