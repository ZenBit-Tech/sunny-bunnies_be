import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class UpdateStatusDto {
  @ApiProperty({ enum: UserStatus, description: 'The status of the user' })
  @IsEnum(UserStatus)
  status: UserStatus;
}
