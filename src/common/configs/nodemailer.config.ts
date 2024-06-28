import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const nodemailerConfigFactory = async (
  configService: ConfigService,
): Promise<MailerOptions> => ({
  transport: {
    host: configService.get<string>('MAIL_HOST'),
    auth: {
      user: configService.get<string>('AUTH_EMAIL'),
      pass: configService.get<string>('AUTH_EMAIL_PASSWORD'),
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  defaults: {
    from: configService.get<string>('AUTH_EMAIL'),
  },
  template: {
    dir: `${process.cwd()}/src/common/templates/`,
    adapter: new HandlebarsAdapter(),
  },
});
