import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

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
}
