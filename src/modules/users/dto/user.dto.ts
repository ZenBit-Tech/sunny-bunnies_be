import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserProfileUpdateDto } from './user-profile-update.dto';

class UserDto {
  @ApiProperty({ example: 'Adam Smith' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'email@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ type: UserProfileUpdateDto })
  profile?: UserProfileUpdateDto;
}

export { UserDto };
