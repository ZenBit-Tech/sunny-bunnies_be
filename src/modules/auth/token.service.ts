import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { decodeJwt, JWTPayload, SignJWT } from 'jose';
import { PayloadToken } from '../../common/types';

@Injectable()
export class TokenService {
  private readonly configService: ConfigService;

  public constructor(configService: ConfigService) {
    this.configService = configService;
  }

  public async createRefresh<T extends Record<string, unknown>>(
    payload: T,
  ): Promise<string> {
    return new SignJWT({
      ...payload,
      type: 'refresh',
    })
      .setProtectedHeader({
        alg: this.configService.get<string>('AUTH_ALGORITHM'),
      })
      .setExpirationTime(
        this.configService.get<string>('REFRESH_TOKEN_EXPIRATION_TIME'),
      )
      .sign(
        new TextEncoder().encode(
          this.configService.get<string>('JWT_SECRET_KEY'),
        ),
      );
  }

  public async createAccess<T extends Record<string, unknown>>(
    payload: T,
  ): Promise<string> {
    return new SignJWT({
      ...payload,
      type: 'access',
    })
      .setProtectedHeader({
        alg: this.configService.get<string>('AUTH_ALGORITHM'),
      })
      .setExpirationTime(
        this.configService.get<string>('ACCESS_TOKEN_EXPIRATION_TIME'),
      )
      .sign(
        new TextEncoder().encode(
          this.configService.get<string>('JWT_SECRET_KEY'),
        ),
      );
  }

  public decode<T>(token: string): JWTPayload & T & PayloadToken {
    return decodeJwt(token) as JWTPayload & T & PayloadToken;
  }

  public isExpired(exp?: number): boolean {
    return Date.now() >= exp * 1000;
  }
}
