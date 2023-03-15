import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryImage } from '../../database/entities/category-image.model';
import { ProductImage } from '../../database/entities/product-image.model';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.services';
import { CategoryImagesRepository } from './repository/category-image.repository';
import { ProductImagesRepository } from './repository/product-image.repository';

@Module({
  imports: [SequelizeModule.forFeature([CategoryImage, ProductImage])],
  controllers: [ImagesController],
  providers: [ImagesService, ProductImagesRepository, CategoryImagesRepository],
  exports: [ImagesService],
})
export class ImagesModule {}
