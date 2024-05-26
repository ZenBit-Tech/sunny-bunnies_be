import { ApiProperty } from '@nestjs/swagger';

export class CreateTestEntityDto {
  @ApiProperty({
    type: String,
    description: 'The value of the test entity. It is a required property.',
  })
  value: string;
}
