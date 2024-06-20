import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tokens' })
export class TokenEntity {
  @ApiProperty({
    type: Number,
    description: 'This is an id that identifies a token entity',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description:
      'This is an jwt token that identifies a restore password session',
  })
  @Column()
  token: string;
}
