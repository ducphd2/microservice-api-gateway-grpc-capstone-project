import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';

import { Product } from '../../database/entities/product.model';

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
  constructor(@InjectModel(Product) readonly model: typeof Product) {
    super(model);
  }
}
