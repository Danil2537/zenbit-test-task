import { BadRequestException, Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class BucketService {
  private r2Client: S3Client;
  private bucket: string;

  constructor(private configService: ConfigService) {
    try {
      const accessKeyId = this.configService.get<string>('R2_ACCESS_KEY_ID')!;
      const secretAccessKey = this.configService.get<string>(
        'R2_ACCESS_KEY_SECRET',
      )!;
      const bucketName = this.configService.get<string>('R2_BUCKET_NAME')!;
      const endpoint = this.configService.get<string>('R2_S3_API')!;
      if (!accessKeyId || !secretAccessKey || !bucketName || !endpoint) {
        throw new BadRequestException('Missing R2 environment variables');
      }

      this.r2Client = new S3Client({
        region: 'auto',
        endpoint,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });

      this.bucket = bucketName;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  // Generate signed URL for GET
  async generateGetUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    const url = await getSignedUrl(this.r2Client, command, {
      expiresIn: 60 * 5,
    }); // 5 minutes
    return url;
  }

  // Generate signed URL for PUT
  async generateUploadUrl(key: string, contentType: string) {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });
    const url = await getSignedUrl(this.r2Client, command, { expiresIn: 60 }); // 1 minute
    return url;
  }
}
