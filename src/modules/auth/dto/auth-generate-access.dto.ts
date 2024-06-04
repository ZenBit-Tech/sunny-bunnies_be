import { IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthGenerateAccess {
  @ApiProperty({
    type: String,
    description: 'Sign up email value for user account',
  })
  @IsJWT()
  refreshToken: string;
}
