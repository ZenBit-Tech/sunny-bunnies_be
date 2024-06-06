import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GoogleAuthSingUpDto {
  @ApiProperty({
    type: String,
    description: 'Google client ID',
  })
  @IsString()
  clientId: string;

  @ApiProperty({
    type: String,
    description: 'Google credential',
  })
  @IsString()
  credential: string;

  @ApiProperty({
    type: String,
    description: 'Select by',
  })
  @IsString()
  select_by: string;
}
