import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsString, MinLength } from 'class-validator';

export class AuthResetPasswordDto {
  @ApiProperty({
    type: String,
    description: 'Restore password token',
  })
  @IsJWT()
  token: string;

  @ApiProperty({
    type: String,
    description: 'User password for user account',
  })
  @IsString()
  @MinLength(8, { message: 'Password needs to be at least 8 characters' })
  password: string;
}
