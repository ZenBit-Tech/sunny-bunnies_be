import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cats' })
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
