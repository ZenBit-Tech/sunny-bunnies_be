import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ProductActivityStatus } from '~/common/enums';
import { PRODUCTS_OFFSET } from '~/common/constants/constants';

export class GetVendorsProductsQueryDto {
  @ApiProperty({
    type: String,
    description: 'Search query for the product name',
    required: false,
  })
  @IsOptional()
  @IsString()
  searchQuery?: string;

  @ApiProperty({
    type: String,
    description: 'The sort order of the products',
    required: false,
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';

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

  @ApiProperty({
    type: Number,
    description: 'The number of products to return',
    required: false,
    default: 5,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
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
    type: [String],
    description: 'The activity statuses of the products',
    required: false,
    enum: ProductActivityStatus,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(ProductActivityStatus, { each: true })
  @Transform(
    ({ value }) => (typeof value === 'string' ? value.split(',') : value),
    { toClassOnly: true },
  )
  activityStatuses?: ProductActivityStatus[];

  @ApiProperty({
    type: String,
    description: 'Filter query for additional product filtering',
    required: false,
  })
  @IsOptional()
  @IsString()
  filter?: string;
}
