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
import { FiltersModule } from './modules/filters/filters.module';
import { FollowersModule } from './modules/followers/followers.module';
import { UploadModule } from './modules/upload/upload.module';
import { AdminModule } from './modules/admin/admin.module';
import { CategoriesModule } from '~/modules/categories/categories.module';
import { ColorsModule } from '~/modules/colors/colors.module';
import { SizesModule } from '~/modules/sizes/sizes.module';

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
    FollowersModule,
    ProductsModule,
    AuthModule,
    UsersModule,
    FiltersModule,
    UploadModule,
    AdminModule,
    CategoriesModule,
    ColorsModule,
    SizesModule,
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
