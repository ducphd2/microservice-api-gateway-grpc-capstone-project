import { GrpcMethod } from '@nestjs/microservices';
import { ICount, IId } from '../../interfaces';
import { CreateProductInput, UpdateProductInput } from '../../interfaces/product';
import { ProductsService } from './products.services';

export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @GrpcMethod('TestCategoryServiceGrpc', 'findAll')
  async findAll() {
    return this.productsService.getProducts();
  }

  @GrpcMethod('TestCategoryServiceGrpc', 'create')
  async create(data: CreateProductInput) {
    const result = await this.productsService.createProduct(data);
    return result;
  }

  @GrpcMethod('TestCategoryServiceGrpc', 'findById')
  async findById({ id }: IId) {
    const result = await this.productsService.findById(id);
    return result;
  }

  @GrpcMethod('TestCategoryServiceGrpc', 'update')
  async updateBranch({ id, data }: UpdateProductInput) {
    const result = await this.productsService.updateProduct(id, data);
    return result;
  }

  @GrpcMethod('TestCategoryServiceGrpc', 'delete')
  async deleteBranch({ id }: IId): Promise<ICount> {
    const count = await this.productsService.deleteProduct(id);
    return { count };
  }
}
