import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';

import { Category } from '../../database/entities/category.model';

@Injectable()
export class CategoriesRepository extends BaseRepository<Category> {
  constructor(@InjectModel(Category) readonly model: typeof Category) {
    super(model);
  }
}
