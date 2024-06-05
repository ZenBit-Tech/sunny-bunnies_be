import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'brands' })
export class BrandEntity {
  @ApiProperty({
    type: Number,
    description: 'This is an id that identifies a brand entity',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'This is the name of the brand',
  })
  @Column({ type: 'text' })
  name: string;
}
