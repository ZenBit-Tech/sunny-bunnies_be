import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class ProductImageDto {
  @ApiProperty({
    description: 'The url of the product image',
    example: 'https://thumbs.dreamstime.com/z/chino-pants-24575402.jpg?ct=jpeg',
  })
  @IsString()
  url: string;

  @ApiProperty({
    description: 'The property that define if product image is primary',
    example: true,
  })
  @IsBoolean()
  isPrimary: boolean;
}
