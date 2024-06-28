import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { extname } from 'path';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer): Promise<string> {
    const bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
    const uniqueFileName = this.generateUniqueFileName(fileName);
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueFileName,
      Body: file,
    });

    await this.s3Client.send(command);

    return `https://${bucketName}.s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com/${uniqueFileName}`;
  }

  private generateUniqueFileName(fileName: string): string {
    const uniqueId = randomUUID();
    const extension = extname(fileName);
    return `${uniqueId}${extension}`;
  }

  async delete(imageUrl: string): Promise<boolean> {
    const bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
    const key = imageUrl.split('.amazonaws.com/')[1];

    if (!key) {
      throw new BadRequestException('Failed to delete image from S3');
    }

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    try {
      await this.s3Client.send(command);

      return true;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete image from S3');
    }
  }
}
