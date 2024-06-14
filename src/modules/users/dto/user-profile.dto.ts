import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

class UserProfileDto {
  @ApiProperty({
    example: 'buyer',
    enum: ['buyer', 'vendor', 'admin'],
    nullable: true,
  })
  @IsEnum(['buyer', 'vendor', 'admin'])
  role: 'buyer' | 'vendor' | 'admin' | null;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'http://example.com/photo.jpg' })
  @IsString()
  profilePhoto: string | null;

  @ApiProperty({ example: '123 Main St' })
  @IsString()
  addressLineOne: string;

  @ApiProperty({ example: 'Apt 4B' })
  @IsString()
  addressLineTwo: string;

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
  clothesSize: string;

  @ApiProperty({ example: '32' })
  @IsString()
  jeansSize: string;

  @ApiProperty({ example: '10' })
  @IsString()
  shoeSize: string;

  @ApiProperty({ example: '1234-5678-9012-3456' })
  @IsString()
  cardNumber: string;

  @ApiProperty({ example: '12/23' })
  @IsString()
  expireDate: string;

  @ApiProperty({ example: '123' })
  @IsString()
  cvvCode: string;

  @ApiProperty({ example: true })
  isRegistrationCompleted: boolean;
}

export { UserProfileDto };
