import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UsersService } from '../users/users.service';
import { GetUser } from '~/common/decorators';
import { User } from '~/entities';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @GetUser() user: User,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1000000 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const fileUrl = await this.uploadService.upload(
      file.originalname,
      file.buffer,
    );
    await this.usersService.updateProfilePhoto(user.id, fileUrl);
  }
}
