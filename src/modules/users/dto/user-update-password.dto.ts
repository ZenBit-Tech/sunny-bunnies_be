import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserUpdatePasswordDto {
  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString({ message: 'Password should be a string' })
  @MinLength(8, { message: 'Password must be at least 6 characters long' })
  password: string;
}
