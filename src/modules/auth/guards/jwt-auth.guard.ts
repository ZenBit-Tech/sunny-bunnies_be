import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../token.service';
import { AuthPayloadToken } from '../../../common/types';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly reflector: Reflector;

  private readonly tokenService: TokenService;

  private readonly usersService: UsersService;

  constructor(
    reflector: Reflector,
    tokenService: TokenService,
    usersService: UsersService,
  ) {
    this.reflector = reflector;
    this.tokenService = tokenService;
    this.usersService = usersService;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const [bearer, token] = request.headers.authorization?.split(' ') ?? [];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        'Authorization header should be in format: Bearer <token>',
      );
    }

    const { userId, exp } = this.tokenService.decode<AuthPayloadToken>(token);
    if (!userId) {
      throw new UnauthorizedException('Invalid token');
    }

    const isExpired = this.tokenService.isExpired(exp);

    if (isExpired) {
      throw new UnauthorizedException('Token expired');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = user;

    return true;
  }
}
