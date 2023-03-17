import { CreateCategoryImageInput, CreateProductImageInput } from '../../interfaces/images';
import { ImagesService } from './images.services';

export class ImagesController {
  constructor(private productsService: ImagesService) {}

  async getProductImages() {
    return this.productsService.getProductImages();
  }

  async getCategoryImages() {
    return this.productsService.getCategoryImages();
  }

  async createProductImage(data: CreateProductImageInput) {
    return this.productsService.createProductImage(data);
  }

  async createCategoryImage(data: CreateCategoryImageInput) {
    return this.productsService.createCategoryImage(data);
  }
}
