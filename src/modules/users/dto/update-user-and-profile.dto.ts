import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { UserProfileUpdateDto } from './user-profile-update.dto';

export class UpdateUserAndProfileDto extends PartialType(UserDto) {
  @ApiPropertyOptional({ type: UserProfileUpdateDto })
  profile: UserProfileUpdateDto;
}
