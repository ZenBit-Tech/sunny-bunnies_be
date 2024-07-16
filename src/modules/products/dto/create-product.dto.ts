import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '~/common/enums';
import { CreateVariantDto } from '~/modules/products/dto/create-variant.dto';
import { CreateImageDto } from '~/modules/products/dto/create-image.dto';

export class CreateProductDto {
  @ApiProperty({ type: String, description: 'Name of the product.' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'Description of product.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: Number, description: 'The number of products to skip' })
  @IsNotEmpty()
  @IsEnum(Gender, { message: 'Gender should be "male" or "female"' })
  gender: Gender;

  @ApiProperty({
    type: Number,
    description: 'The minimum price of the product',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  minPrice: number;

  @ApiProperty({
    type: Number,
    description: 'The maximum price of the product',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  maxPrice: number;

  @ApiProperty({ type: Number, description: 'The type id of the product' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  type: number;

  @ApiProperty({ type: Number, description: 'The style id of the product' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  style: number;

  @ApiProperty({ type: Number, description: 'The brand id of the product' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  brand: number;

  @ApiProperty({ type: Number, description: 'The material id of the product' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  material: number;

  @ApiProperty({ type: Number, description: 'The category id of the product' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  category: number;

  @ApiProperty({ type: Array, description: 'The variants of the product' })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  variants: CreateVariantDto[];

  @ApiProperty({ type: Array, description: 'Photos of the product' })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImageDto)
  images: CreateImageDto[];
}
