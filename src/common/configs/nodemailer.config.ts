import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';

export const nodemailerConfigFactory = async (
  configService: ConfigService,
): Promise<MailerOptions> => ({
  transport: {
    host: configService.get<string>('MAIL_HOST'),
    auth: {
      user: configService.get<string>('AUTH_EMAIL'),
      pass: configService.get<string>('AUTH_EMAIL_PASSWORD'),
    },
  },
  defaults: {
    from: configService.get<string>('AUTH_EMAIL'),
  },
});
