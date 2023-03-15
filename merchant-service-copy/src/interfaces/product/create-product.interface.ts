export interface CreateProductInput {
  name: string;
  code: string;
  description: string;
  price: number;
  categoryId: number;
}

export interface UpdateProductInput {
  id: number;
  data: Partial<CreateProductInput>;
}
