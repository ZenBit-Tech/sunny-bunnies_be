import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'material' })
export class MaterialEntity {
  @ApiProperty({
    type: Number,
    description: 'This is an id that identifies a material entity',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'This is the name of the material',
  })
  @Column({ type: 'text' })
  name: string;
}
