import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseType } from './base.type';

@ObjectType()
export class ImageCategory extends BaseType {
  @Field(() => String)
  name: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
