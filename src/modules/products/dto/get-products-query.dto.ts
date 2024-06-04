import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
}
