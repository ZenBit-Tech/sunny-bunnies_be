import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailerService } from '@nestjs-modules/mailer';
import { ProductEntity } from '~/entities';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    UsersModule,
    MailerService,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
