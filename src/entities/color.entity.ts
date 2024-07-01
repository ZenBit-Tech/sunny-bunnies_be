import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'colors' })
export class ColorEntity {
  @ApiProperty({
    type: Number,
    description: 'This is an id that identifies a color entity',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'This is the name of the color',
  })
  @Column({ type: 'varchar' })
  name: string;
}
