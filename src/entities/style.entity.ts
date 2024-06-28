import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'styles' })
export class StyleEntity {
  @ApiProperty({
    type: Number,
    description: 'This is an id that identifies a style entity',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'This is the name of the style',
  })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'This is the id of the category to which the style belongs',
  })
  @Column()
  category_id: number;
}
