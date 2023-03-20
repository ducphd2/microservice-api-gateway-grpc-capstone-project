import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseType } from './base.type';
import { CategoryImage } from './category-image.type';
import { Product } from './product.type';

@ObjectType()
export class Category extends BaseType {
  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;

  @Field(() => [CategoryImage], { nullable: true })
  images: CategoryImage[];

  @Field(() => [Product], { nullable: true })
  products: Product[];
}
