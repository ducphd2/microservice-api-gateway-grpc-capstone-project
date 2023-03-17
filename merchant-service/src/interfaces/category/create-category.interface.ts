export interface CreateCategoryInput {
  name: string;
  code: string;
  imageUrl?: string;
}

export interface UpdateCategoryInput {
  id: number;
  data: Partial<CreateCategoryInput>;
}
