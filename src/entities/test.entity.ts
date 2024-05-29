import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'test' })
export class TestEntity {
  @ApiProperty({
    type: Number,
    description: 'This is an id that identifies a test entity',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'This is the value of the test entity',
  })
  @Column({ type: 'text' })
  value: string;
}
