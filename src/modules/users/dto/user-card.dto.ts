import { IsString, IsOptional } from 'class-validator';

class UserCardDto {
  @IsString()
  @IsOptional()
  cardNumber?: string;

  @IsString()
  @IsOptional()
  expireDate?: string;

  @IsString()
  @IsOptional()
  cvvCode?: string;
}

export { UserCardDto };
