import { GrpcMethod } from '@nestjs/microservices';
import { ICount, IId } from '../../interfaces';
import { CreateCategoryInput, UpdateCategoryInput } from '../../interfaces/category';
import { CategoriesService } from './categories.services';
import { Controller } from '@nestjs/common';

@Controller()
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @GrpcMethod('MerchantCategoryServiceGrpc', 'findAll')
  async findAll() {
    return this.categoriesService.getCategories();
  }

  @GrpcMethod('MerchantCategoryServiceGrpc', 'create')
  async create(data: CreateCategoryInput) {
    const result = await this.categoriesService.createCategory(data);
    return result;
  }

  @GrpcMethod('MerchantCategoryServiceGrpc', 'findById')
  async findById({ id }: IId) {
    const result = await this.categoriesService.findById(id);
    return result;
  }

  @GrpcMethod('MerchantCategoryServiceGrpc', 'update')
  async updateBranch({ id, data }: UpdateCategoryInput) {
    const result = await this.categoriesService.updateCategory(id, data);
    return result;
  }

  @GrpcMethod('MerchantCategoryServiceGrpc', 'delete')
  async deleteBranch({ id }: IId): Promise<ICount> {
    const count = await this.categoriesService.deleteCategory(id);
    return { count };
  }
}
