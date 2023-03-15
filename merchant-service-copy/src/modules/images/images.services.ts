import { Injectable } from '@nestjs/common';
import { CategoryImage } from '../../database/entities/category-image.model';
import { ProductImage } from '../../database/entities/product-image.model';
import { IPaginationRes } from '../../interfaces';
import { CategoryImagesRepository } from './repository/category-image.repository';
import { ProductImagesRepository } from './repository/product-image.repository';
import { Attributes } from 'sequelize';

@Injectable()
export class ImagesService {
  constructor(
    private productImagesRepository: ProductImagesRepository,
    private categoryImagesRepository: CategoryImagesRepository,
  ) {}

  getProductImages(page?: number, limit?: number): Promise<IPaginationRes<ProductImage>> {
    const getAllCondition = {};
    return this.productImagesRepository.paginate(getAllCondition, page, limit);
  }

  getCategoryImages(page?: number, limit?: number): Promise<IPaginationRes<CategoryImage>> {
    const getAllCondition = {};
    return this.categoryImagesRepository.paginate(getAllCondition, page, limit);
  }

  async createProductImage(data: Attributes<ProductImage>): Promise<ProductImage> {
    return await this.productImagesRepository.create(data);
  }

  async createCategoryImage(data: Attributes<CategoryImage>): Promise<CategoryImage> {
    return await this.categoryImagesRepository.create(data);
  }
}
