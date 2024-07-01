import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ProductVariantDto {
  @ApiProperty({
    description: 'The color id of the product variant',
    example: 1,
  })
  @IsNumber()
  color: number;

  @ApiProperty({
    description: 'The size id of the product variant',
    example: 1,
  })
  @IsNumber()
  size: number;

  @ApiProperty({
    description: 'The quantity of the product variant',
    example: 10,
  })
  @IsNumber()
  quantity: number;
}
