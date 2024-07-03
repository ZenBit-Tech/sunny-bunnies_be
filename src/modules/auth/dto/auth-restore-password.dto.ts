import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AuthRestorePasswordDto {
  @ApiProperty({
    type: String,
    description: 'Email associated with user account',
  })
  @IsEmail()
  email: string;
}
