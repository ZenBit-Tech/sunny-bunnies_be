import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

class UserProfileDto {
  @ApiProperty({ example: 'buyer' })
  @IsEnum(['buyer', 'vendor'])
  role: 'buyer' | 'vendor';

  @ApiProperty({ example: '1234567890' })
  @IsString()
  phone_number: string;

  @ApiProperty({ example: 'http://example.com/photo.jpg' })
  @IsString()
  profile_photo: string;

  @ApiProperty({ example: '123 Main St' })
  @IsString()
  address_line_1: string;

  @ApiProperty({ example: 'Apt 4B' })
  @IsString()
  address_line_2: string;

  @ApiProperty({ example: 'USA' })
  @IsString()
  country: string;

  @ApiProperty({ example: 'CA' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'Los Angeles' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'M' })
  @IsString()
  clothes_size: string;

  @ApiProperty({ example: '32' })
  @IsString()
  jeans_size: string;

  @ApiProperty({ example: '10' })
  @IsString()
  shoe_size: string;

  @ApiProperty({ example: '1234-5678-9012-3456' })
  @IsString()
  card_number: string;

  @ApiProperty({ example: '12/23' })
  @IsString()
  expire_date: string;

  @ApiProperty({ example: '123' })
  @IsString()
  cvv_code: string;

  @ApiProperty({ example: true })
  isRegistrationComplete: boolean;
}

export { UserProfileDto };
