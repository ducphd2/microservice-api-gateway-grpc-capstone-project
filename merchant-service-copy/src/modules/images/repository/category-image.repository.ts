import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { BaseRepository } from '../../../database/base.repository';
import { CategoryImage } from '../../../database/entities/category-image.model';

@Injectable()
export class CategoryImagesRepository extends BaseRepository<CategoryImage> {
  constructor(@InjectModel(CategoryImage) readonly model: typeof CategoryImage) {
    super(model);
  }
}
