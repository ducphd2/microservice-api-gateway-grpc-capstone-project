import { Metadata } from '@grpc/grpc-js';
import { Field, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { ICount, IId, IQuery } from '../../../commons/commons.interface';
import { Category, ImageCategory } from '../../../types';
import { CategoryDto } from '../dtos';

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
  image: ImageCategory;
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
