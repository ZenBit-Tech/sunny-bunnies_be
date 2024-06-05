import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthSignInDto {
  @ApiProperty({
    type: String,
    description: 'Sign up email value for user account',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password for user account',
  })
  @IsString()
  @MinLength(8, { message: 'Password needs to be at least 8 characters' })
  password: string;
}
