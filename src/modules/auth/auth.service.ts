import { ConflictException, Injectable } from '@nestjs/common';
import { UserSignUpDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  private readonly usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  async signUp(userSignUpDto: UserSignUpDto): Promise<User> {
    const { email, password } = userSignUpDto;
    const existedUser = await this.usersService.findByEmail(email);

    if (existedUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.usersService.createOne({
      email,
      password,
    });

    return user;
  }
}
