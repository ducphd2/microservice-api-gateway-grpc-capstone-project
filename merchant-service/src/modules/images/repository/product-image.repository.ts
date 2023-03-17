import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { BaseRepository } from '../../../database/base.repository';
import { ProductImage } from '../../../database/entities/product-image.model';

@Injectable()
export class ProductImagesRepository extends BaseRepository<ProductImage> {
  constructor(@InjectModel(ProductImage) readonly model: typeof ProductImage) {
    super(model);
  }
}
