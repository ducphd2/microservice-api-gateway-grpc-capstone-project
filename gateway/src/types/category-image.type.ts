import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { BaseType } from './base.type';

@ObjectType()
export class CategoryImage extends BaseType {
  @Field(() => String)
  name: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => ID)
  categoryId: number;

  @Field(() => String, { nullable: true })
  description?: string;
}
