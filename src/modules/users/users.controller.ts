import {
  Body,
  Controller,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { GetUser } from '~/common/decorators';
import { User } from '~/entities';
import { UserProfileUpdateDto, UserCardDto } from './dto/index';
import { UploadService } from '../upload/upload.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  private readonly usersService: UsersService;

  private readonly uploadService: UploadService;

  constructor(usersService: UsersService, uploadService: UploadService) {
    this.usersService = usersService;
    this.uploadService = uploadService;
  }

  @Get('current')
  @HttpCode(200)
  getCurrent(@GetUser() user: User): User {
    return user;
  }

  @Patch('update')
  @HttpCode(200)
  async updateProfile(
    @GetUser() user: User,
    @Body() updateProfileDto: UserProfileUpdateDto,
  ): Promise<User> {
    return this.usersService.updateProfile(user.id, updateProfileDto);
  }

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  async uploadAvatar(
    @GetUser() user: User,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1048576 })],
      }),
    )
    avatar: Express.Multer.File,
  ): Promise<User> {
    const fileUrl = await this.uploadService.upload(
      avatar.originalname,
      avatar.buffer,
    );

    return this.usersService.updateProfilePhoto(user.id, fileUrl);
  }

  @Patch('update-card')
  @HttpCode(200)
  async updateCard(
    @GetUser() user: User,
    @Body() updateCardDto: UserCardDto,
  ): Promise<User> {
    return this.usersService.updateCard(user.id, updateCardDto);
  }
}
