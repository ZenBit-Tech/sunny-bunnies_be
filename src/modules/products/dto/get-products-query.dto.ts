import { ApiProperty } from '@nestjs/swagger';

export class GetProductsQueryDto {
  @ApiProperty({
    type: String,
    description:
      'The query of the products get request. All queries are optional',
    required: false,
  })
  category?: string;
}
