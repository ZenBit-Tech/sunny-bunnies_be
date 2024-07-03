import { Test, TestingModule } from '@nestjs/testing';
import { Otp } from '../otp.package';

describe('Otp', () => {
  let otpUtil: Otp;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Otp],
    }).compile();

    otpUtil = module.get<Otp>(Otp);
  });

  it('should generate OTP of specified length', () => {
    const length = 6;
    const otp = otpUtil.generateCode({ length });

    expect(otp).toHaveLength(length);
    expect(/^\d+$/.test(otp)).toBe(true);
  });
});
