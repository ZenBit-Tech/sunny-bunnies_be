import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const GetCurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const configService = new ConfigService();

    const request = ctx.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return null;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(
        token,
        configService.get<string>('JWT_SECRET_KEY'),
      );
      return decoded;
    } catch (error) {
      return null;
    }
  },
);
