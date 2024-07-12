import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class GetWishProductsQueryDto {
  @ApiProperty({
    type: Number,
    description: 'The number of products to return',
    required: false,
    default: 12,
  })
  @IsOptional()
  @IsString()
  limit?: number;

  @ApiProperty({
    type: Number,
    description: 'The page number for pagination',
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;
}
