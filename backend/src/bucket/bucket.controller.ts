import { Controller, Get, Param } from '@nestjs/common';
import { BucketService } from './bucket.service';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}
  @Get(':key')
  async getImageUrl(@Param('key') key: string) {
    const url = await this.bucketService.generateGetUrl(key);
    return { url };
  }
}
