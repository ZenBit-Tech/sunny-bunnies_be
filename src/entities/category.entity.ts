import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'category' })
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
  @Column({ type: 'text' })
  name: string;
}
