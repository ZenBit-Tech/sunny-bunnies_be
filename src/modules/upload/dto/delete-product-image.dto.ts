import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteProductImageDto {
  @ApiProperty({
    type: String,
    description:
      'The query of the products get request. All queries are optional',
    required: false,
  })
  @IsString()
  url: string;
}
