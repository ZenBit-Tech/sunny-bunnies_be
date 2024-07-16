import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({ type: String, description: 'The src address of the image' })
  @IsNotEmpty()
  @IsString()
  src: string;

  @ApiProperty({ type: String, description: 'Description of image' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: Boolean, description: 'If the image is primary' })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}
