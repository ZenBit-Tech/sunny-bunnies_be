import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import {
  PRODUCTS_LIMIT,
  PRODUCTS_OFFSET,
} from '../../../common/constants/constants.js';

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
}
