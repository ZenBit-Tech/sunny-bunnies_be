import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class AuthVerifyOtpDto {
  @ApiProperty({
    type: String,
    description: 'Email to be verified',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Otp code to be verified',
  })
  @IsString()
  @Length(6, 6)
  code: string;
}
