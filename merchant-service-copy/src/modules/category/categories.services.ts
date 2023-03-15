import { Injectable } from '@nestjs/common';
import { Attributes, WhereOptions } from 'sequelize';
import { MERCHANT } from '../../constants';
import { ErrorHelper } from '../../helpers';
import { IPaginationRes } from '../../interfaces';
import { CategoriesRepository } from './categories.repository';
import { Category } from '../../database/entities/category.model';
import { ImagesService } from '../images/images.services';
import { CategoryImage } from '../../database/entities/category-image.model';
import { CreateCategoryResponse } from '../../interfaces/category';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository, private readonly imagesService: ImagesService) {}

  getCategories(page?: number, limit?: number): Promise<IPaginationRes<Category>> {
    const getAllCondition = {};
    return this.categoriesRepository.paginate(getAllCondition, page, limit);
  }

  async createCategory(data: Attributes<Category>): Promise<CreateCategoryResponse> {
    const category = await this.categoriesRepository.create(data);
    let categoryImage: CategoryImage = null;
    if (data.imageUrl) {
      categoryImage = await this.imagesService.createCategoryImage({
        imageUrl: data.imageUrl,
        description: 'hihi',
        categoryId: category.id,
      });
    }
    return {
      category,
      image: categoryImage,
    };
  }

  async findById(id: number): Promise<Category> {
    return this.categoriesRepository.findById(id);
  }

  async updateCategory(id: number, params: Attributes<Category>): Promise<Category> {
    const merchant = await this.findById(id);
    if (!merchant) {
      ErrorHelper.BadRequestException(MERCHANT.MERCHANT_NOT_FOUND);
    }

    const updateByIdConditions: WhereOptions<Category> = { id: merchant.id };
    const affectedRows = await this.categoriesRepository.update({ ...params }, updateByIdConditions);

    return affectedRows[0];
  }

  async deleteCategory(id: number): Promise<number> {
    const removeByIdConditions: WhereOptions<Category> = { id };

    return this.categoriesRepository.delete(removeByIdConditions);
  }
}
