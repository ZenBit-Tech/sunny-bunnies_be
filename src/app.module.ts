import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { nodemailerConfigFactory, typeOrmConfigAsync } from './common/configs';
import { TestModule } from './modules/test/test.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/guards';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    MailerModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: './.env',
        }),
      ],
      useFactory: nodemailerConfigFactory,
      inject: [ConfigService],
    }),
    TestModule,
    ProductsModule,
    AuthModule,
    UsersModule,
    UploadModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
