export class CreateUserDto {
  name: string;

  email: string;

  passwordHash: string;

  passwordSalt: string;
}
