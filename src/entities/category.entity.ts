import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { TypeEntity } from "~/entities/type.entity";
import { StyleEntity } from "~/entities/style.entity";
import { BrandEntity } from "~/entities/brand.entity";
import { MaterialEntity } from "~/entities/material.entity";

@Entity({ name: 'categories' })
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

  @ApiProperty({
    description: 'Reference to the types entity',
  })
  @ManyToMany(() => TypeEntity)
  @JoinTable({
    name: 'category_types',
    joinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'type_id',
      referencedColumnName: 'id',
    },})
  types: TypeEntity[];

  @ApiProperty({
    description: 'Reference to the styles entity',
  })
  @ManyToMany(() => StyleEntity)
  @JoinTable({
    name: 'category_styles',
    joinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'style_id',
      referencedColumnName: 'id',
    },
  })
  styles: StyleEntity[];

  @ApiProperty({
    description: 'Reference to the brands entity',
  })
  @ManyToMany(() => BrandEntity)
  @JoinTable({
    name: 'category_brands',
    joinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'brand_id',
      referencedColumnName: 'id',
    },
  })
  brands: BrandEntity[];

  @ApiProperty({
    description: 'Reference to the materials entity',
  })
  @ManyToMany(() => MaterialEntity)
  @JoinTable({
    name: 'category_materials',
    joinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'material_id',
      referencedColumnName: 'id',
    },
  })
  materials: MaterialEntity[];
}
