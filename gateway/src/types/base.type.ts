import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseType {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  createdAt: number;

  @Field(() => Int)
  updatedAt: number;
}
