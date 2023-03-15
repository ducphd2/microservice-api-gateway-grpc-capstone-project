import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseType } from './base.type';
import { ImageCategory } from './image.type';

@ObjectType()
export class Category extends BaseType {
  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;

  @Field(() => ImageCategory, { nullable: true })
  image: ImageCategory;
}
