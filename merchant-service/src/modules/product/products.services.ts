import { Injectable } from '@nestjs/common';
import { Attributes, WhereOptions } from 'sequelize';
import { MERCHANT } from '../../constants';
import { Product } from '../../database/entities/product.model';
import { ErrorHelper } from '../../helpers';
import { IPaginationRes } from '../../interfaces';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  getProducts(page?: number, limit?: number): Promise<IPaginationRes<Product>> {
    const getAllCondition = {};
    return this.productsRepository.paginate(getAllCondition, page, limit);
  }

  async createProduct(data: Attributes<Product>): Promise<Product> {
    return await this.productsRepository.create(data);
  }

  async findById(id: number): Promise<Product> {
    return this.productsRepository.findById(id);
  }

  async updateProduct(id: number, params: Attributes<Product>): Promise<Product> {
    const merchant = await this.findById(id);
    if (!merchant) {
      ErrorHelper.BadRequestException(MERCHANT.MERCHANT_NOT_FOUND);
    }

    const updateByIdConditions: WhereOptions<Product> = { id: merchant.id };
    const affectedRows = await this.productsRepository.update({ ...params }, updateByIdConditions);

    return affectedRows[0];
  }

  async deleteProduct(id: number): Promise<number> {
    const removeByIdConditions: WhereOptions<Product> = { id };

    return this.productsRepository.delete(removeByIdConditions);
  }
}
