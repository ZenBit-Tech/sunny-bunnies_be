import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { decodeJwt } from 'jose';
import { Token } from '../token.package';

describe('Token', () => {
  let service: Token;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Token,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'AUTH_ALGORITHM':
                  return 'HS256';
                case 'JWT_SECRET_KEY':
                  return 'my-secret-key';
                case 'ACCESS_TOKEN_EXPIRATION_TIME':
                  return '1h';
                case 'REFRESH_TOKEN_EXPIRATION_TIME':
                  return '7d';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<Token>(Token);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('isExpired', () => {
    it('should return true if token is expired', () => {
      const exp = Math.floor(Date.now() / 1000) - 3600;

      const result = service.isExpired(exp);

      expect(result).toBe(true);
    });

    it('should return false if token is not expired', () => {
      const exp = Math.floor(Date.now() / 1000) + 3600;

      const result = service.isExpired(exp);

      expect(result).toBe(false);
    });
  });

  describe('generate', () => {
    it('should generate a valid JWT token', async () => {
      const payload = { userId: 1 };
      const expiresIn = '1h';

      const token = await service.generate(payload, { expiresIn });
      const decodedToken = decodeJwt(token);

      expect(decodedToken).toHaveProperty('userId', 1);
      expect(decodedToken).toHaveProperty('exp');
      expect(typeof decodedToken.exp).toBe('number');
      expect(decodedToken.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
    });
  });

  describe('generateAccess', () => {
    it('should generate a valid access token', async () => {
      const payload = { userId: 1 };

      const token = await service.generateAccess(payload);
      const decodedToken = decodeJwt(token);

      expect(decodedToken).toHaveProperty('userId', 1);
      expect(decodedToken).toHaveProperty('exp');
      expect(typeof decodedToken.exp).toBe('number');
      expect(decodedToken.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
      expect(decodedToken).toHaveProperty('type', 'access');
    });
  });

  describe('generateRefresh', () => {
    it('should generate a valid refresh token', async () => {
      const payload = { userId: 1 };

      const token = await service.generateRefresh(payload);
      const decodedToken = decodeJwt(token);

      expect(decodedToken).toHaveProperty('userId', 1);
      expect(decodedToken).toHaveProperty('exp');
      expect(typeof decodedToken.exp).toBe('number');
      expect(decodedToken.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
      expect(decodedToken).toHaveProperty('type', 'refresh');
    });
  });

  describe('decode', () => {
    it('should decode a JWT token', async () => {
      const payload = { userId: 1 };
      const expiresIn = '1h';

      const token = await service.generate(payload, { expiresIn });
      const decodedToken = service.decode<{ userId: number }>(token);

      expect(decodedToken).toHaveProperty('userId', 1);
      expect(decodedToken).toHaveProperty('exp');
      expect(typeof decodedToken.exp).toBe('number');
      expect(decodedToken.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
    });
  });
});
