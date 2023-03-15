import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [CloudinaryProvider, UploadService, UploadResolver],
  exports: [CloudinaryProvider, UploadService],
})
export class UploadModule {}
