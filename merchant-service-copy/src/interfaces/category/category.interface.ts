import { CategoryImage } from '../../database/entities/category-image.model';
import { Category } from '../../database/entities/category.model';

export interface CreateCategoryResponse {
  category: Category;
  image?: CategoryImage;
}
