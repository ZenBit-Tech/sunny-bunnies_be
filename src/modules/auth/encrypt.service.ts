import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class EncryptService {
  private readonly configService: ConfigService;

  public constructor(configService: ConfigService) {
    this.configService = configService;
  }

  public generateSalt(salt: number): Promise<string> {
    return genSalt(salt);
  }

  public encrypt(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }

  public async compare({
    data,
    salt,
    passwordHash,
  }: {
    data: string;
    salt: string;
    passwordHash: string;
  }): Promise<boolean> {
    const hashValue = await this.encrypt(data, salt);

    return hashValue === passwordHash;
  }

  public generateRandomPassword(): string {
    const characters = this.configService.get<string>(
      'GENERATE_PASS_CHARACTER',
    );
    const length = this.configService.get<number>('PASS_LENGTH');

    return Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)],
    ).join('');
  }
}
