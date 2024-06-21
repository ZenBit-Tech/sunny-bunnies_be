import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from '~/entities';
import { UsersController } from './users.controller';
import { EncryptService } from '../auth/encrypt.service';
import { UploadModule } from '../upload/upload.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, EncryptService, ConfigService],
  imports: [TypeOrmModule.forFeature([User]), UploadModule],
  exports: [UsersService],
})
export class UsersModule {}
