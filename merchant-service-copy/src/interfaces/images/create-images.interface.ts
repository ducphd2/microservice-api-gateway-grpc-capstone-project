export interface CreateProductImageInput {
  imageUrl: string;
  description?: string;
  productId: number;
}

export interface CreateCategoryImageInput {
  imageUrl: string;
  description?: string;
  categoryId: number;
}
