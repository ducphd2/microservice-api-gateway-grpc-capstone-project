import { Controller, HttpException, HttpStatus, Logger, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('file')
export class UploadController {
  private readonly logger = new Logger(this.constructor.name);
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      if (!files.length) {
        throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
      }
      return await this.uploadService.uploadFiles(files);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException('Upload file file', HttpStatus.BAD_REQUEST);
    }
  }
}
