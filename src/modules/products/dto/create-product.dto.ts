import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { ProductVariantDto } from './product-variant.dto';
import { ProductImageDto } from './product-image.dto';

const minProductVariantsLength = 1;
const minImagesLength = 4;

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'The name of new product',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'The description of new product',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
    description: 'The min price of new product',
    required: true,
  })
  @IsNumber()
  minPrice: number;

  @ApiProperty({
    type: Number,
    description: 'The max price of new product',
    required: true,
  })
  @IsNumber()
  maxPrice: number;

  @ApiProperty({
    type: Number,
    description: 'The category of new product',
    required: true,
  })
  @IsNumber()
  category: number;

  @ApiProperty({
    type: Number,
    description: 'The type of new product',
    required: true,
  })
  @IsNumber()
  type: number;

  @ApiProperty({
    type: Number,
    description: 'The brand of new product',
    required: true,
  })
  @IsNumber()
  brand: number;

  @ApiProperty({
    type: Number,
    description: 'The material of new product',
    required: true,
  })
  @IsNumber()
  material: number;

  @ApiProperty({
    type: Number,
    description: 'The style of new product',
    required: true,
  })
  @IsNumber()
  style: number;

  @ApiProperty({
    type: Number,
    description: 'The gender of new product',
    required: true,
  })
  @IsNumber()
  gender: number;

  @ApiProperty({
    type: [ProductVariantDto],
    description:
      'The variants of the new product. Each variant includes color id, size id, and quantity',
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  @ArrayMinSize(minProductVariantsLength, {
    message: 'At least one variant is required',
  })
  variants: ProductVariantDto[];

  @ApiProperty({
    type: [ProductImageDto],
    description: 'The images url of the new product',
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  @ArrayMinSize(minImagesLength, {
    message: 'Four images are required',
  })
  images: ProductImageDto[];
}
