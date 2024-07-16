import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVariantDto {
  @ApiProperty({ type: Number, description: 'The color id of the variant' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  color: number;

  @ApiProperty({ type: Number, description: 'The size id of the variant' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  size: number;

  @ApiProperty({ type: Number, description: 'Quantity of the variant' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;
}
