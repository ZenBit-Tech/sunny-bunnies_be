import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { decodeJwt, JWTPayload, SignJWT } from 'jose';

@Injectable()
export class TokenService {
  private readonly configService: ConfigService;

  public constructor(configService: ConfigService) {
    this.configService = configService;
  }

  public async create<T extends Record<string, unknown>>(
    payload: T,
  ): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(
        new TextEncoder().encode(
          this.configService.get<string>('JWT_SECRET_KEY'),
        ),
      );
  }

  public decode<T>(token: string): JWTPayload & T {
    return decodeJwt(token) as JWTPayload & T;
  }
}
