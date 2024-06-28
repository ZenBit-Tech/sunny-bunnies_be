import { Injectable } from '@nestjs/common';

@Injectable()
export class Otp {
  public generateCode({ length }: { length: number }): string {
    let otp = '';

    for (let i = 0; i < length; i += 1) {
      otp += Math.floor(Math.random() * 10);
    }

    return otp;
  }
}
