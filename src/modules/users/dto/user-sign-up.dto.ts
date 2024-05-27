import { IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignUpDto {
  @ApiProperty({
    type: String,
    description: 'Sign up gmail value for user account',
  })
  @IsString()
  @Matches(/^[\w.+-]+@gmail\.com$/, {
    message: 'You need to provide your gmail address',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password for user account',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
