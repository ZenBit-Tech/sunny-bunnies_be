import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
  @Column({ type: 'text' })
  name: string;
}
