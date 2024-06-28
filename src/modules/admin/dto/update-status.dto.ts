import { IsEnum } from 'class-validator';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class UpdateStatusDto {
  @IsEnum(UserStatus)
  status: UserStatus;
}
