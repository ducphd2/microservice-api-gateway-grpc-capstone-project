import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../../guard/auth.guard';
import { Category } from '../../types';
import { MerchantCategoryService } from './category.service';
import { CategoryDto, UploadInputArgs } from './dtos';
import { DeleteCategoryPayload, FindAllCategories } from './interfaces/merchant-branch-service-grpc';
import { RpcException } from '@nestjs/microservices';

@Resolver()
export class MerchantCategoryResolver {
  constructor(private merchantService: MerchantCategoryService) {}

  @Query(() => FindAllCategories)
  @UseGuards(AuthGuard)
  async findCategories(): Promise<FindAllCategories> {
    return this.merchantService.find();
  }

  @Query(() => Category)
  @UseGuards(AuthGuard)
  async findCategoryById(@Args('id') id: number): Promise<Category> {
    return this.merchantService.findById(id);
  }

  @Mutation(() => Category)
  @UseGuards(AuthGuard)
  async createCategory(@Args() data: UploadInputArgs): Promise<Category> {
    try {
      return await this.merchantService.create(data);
    } catch (error) {
      throw new RpcException({
        message: 'Can not create category',
        code: 500,
      });
    }
  }

  @Mutation(() => Category)
  @UseGuards(AuthGuard)
  async updateCategory(@Args('id') id: number, @Args('data') data: CategoryDto): Promise<Category> {
    return this.merchantService.update(id, data);
  }

  @Mutation(() => Category)
  @UseGuards(AuthGuard)
  async deleteCategory(@Args('id') id: number): Promise<DeleteCategoryPayload> {
    return this.merchantService.delete(id);
  }
}
