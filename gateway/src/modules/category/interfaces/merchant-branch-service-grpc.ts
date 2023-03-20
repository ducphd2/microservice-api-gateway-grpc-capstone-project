import { Metadata } from '@grpc/grpc-js';
import { Field, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Category, CategoryImage } from '../../../types';
import { CategoryDto } from '../dtos';
import { ICount, IId, IQuery } from '../../../interfaces';

export interface UpdateCategoryInput {
  id: number;
  data: CategoryDto;
}

export interface ErrorPayload {
  field?: string;
  message?: string[];
}

export interface DeleteCategoryPayload {
  errors?: ErrorPayload[];
  count?: number;
}

@ObjectType()
export class FindAllCategories {
  @Field(() => [Category])
  categories: Category[];
}

@ObjectType()
export class CreateCategoryResponse {
  @Field(() => Category)
  category: Category;

  @Field(() => Category, { nullable: true })
  images: CategoryImage;
}

export interface MerchantCategoryServiceGrpc {
  find(query?: IQuery, metadata?: Metadata): Observable<FindAllCategories>;
  findById(id: IId, metadata?: Metadata): Observable<Category>;
  findOne(query?: IQuery, metadata?: Metadata): Observable<Category>;
  count(query?: IQuery, metadata?: Metadata): Observable<ICount>;
  create(input: CategoryDto, metadata?: Metadata): Observable<CreateCategoryResponse>;
  update(input: UpdateCategoryInput): Observable<Category>;
  destroy(query?: IQuery, metadata?: Metadata): Observable<ICount>;
  delete(id: IId, metadata?: Metadata): Observable<ICount>;
}
