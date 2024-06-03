import { IsEmail, IsString, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthSignUpDto {
  @ApiProperty({
    type: String,
    description: 'Name for user account',
  })
  @IsString()
  @Length(2, 20)
  name: string;

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
