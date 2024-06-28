import {
  Body,
  Controller,
  Delete,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser, PublicRoute } from '~/common/decorators';
import { User } from '~/entities';

import { DeleteProductImageDto } from './dto/delete-product-image.dto';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

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
    return this.uploadService.upload(file.originalname, file.buffer);
  }

  @PublicRoute()
  @Post('/product-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProductImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1000000 })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<{ url: string }> {
    const response = await this.uploadService.upload(
      file.originalname,
      file.buffer,
    );
    return { url: response };
  }

  @PublicRoute()
  @Delete('/product-image')
  async deleteProductImage(
    @Body() deleteImageDto: DeleteProductImageDto,
  ): Promise<boolean> {
    const { url } = deleteImageDto;
    return this.uploadService.delete(url);
  }
}
