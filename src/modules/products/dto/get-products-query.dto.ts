import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

import { PRODUCTS_LIMIT, PRODUCTS_OFFSET } from '~/common/constants/constants';

export class GetProductsQueryDto {
  @ApiProperty({
    type: String,
    description:
      'The query of the products get request. All queries are optional',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    type: Number,
    description: 'The number of products to return',
    required: false,
    default: PRODUCTS_LIMIT,
  })
  @IsOptional()
  @IsString()
  limit?: number;

  @ApiProperty({
    type: Number,
    description: 'The number of products to skip',
    required: false,
    default: PRODUCTS_OFFSET,
  })
  @IsOptional()
  @IsString()
  offset?: number;

  @ApiProperty({
    type: Number,
    description: 'The number of days for choose products',
    required: false,
  })
  @IsOptional()
  @IsString()
  dateRange?: number;

  @ApiProperty({
    type: String,
    description: 'The name of the products',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    type: String,
    description: 'The gender of the products',
    required: false,
  })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({
    type: Number,
    description: 'The minimum price of the products',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @ApiProperty({
    type: Number,
    description: 'The maximum price of the products',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @ApiProperty({
    type: String,
    description: 'The size of the products',
    required: false,
  })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiProperty({
    type: String,
    description: 'The color of the products',
    required: false,
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({
    type: String,
    description: 'The style of the products',
    required: false,
  })
  @IsOptional()
  @IsString()
  style?: string;

  @ApiProperty({
    type: String,
    description: 'The brand of the products',
    required: false,
  })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({
    type: String,
    description: 'The material of the products',
    required: false,
  })
  @IsOptional()
  @IsString()
  material?: string;
}
