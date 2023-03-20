import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { BaseType } from './base.type';

@ObjectType()
export class ProductImage extends BaseType {
  @Field(() => String)
  name: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => ID)
  productId: number;

  @Field(() => String, { nullable: true })
  description?: string;
}
