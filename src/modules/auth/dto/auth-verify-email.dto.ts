import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AuthVerifyEmailDto {
  @ApiProperty({
    type: String,
    description: 'Email to be verified',
  })
  @IsEmail()
  email: string;
}
