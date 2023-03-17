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

@ObjectType()
export class PageInfo {
  @Field(() => String, { nullable: true })
  endCursor?: string;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;

  @Field(() => String, { nullable: true })
  startCursor?: string;
}

@ObjectType()
export class ErrorPayload {
  @Field(() => String, { nullable: true })
  field?: string;

  @Field(() => [String], { nullable: true })
  message?: string[];
}

export interface IErrorPayload {
  field?: string;
  message?: string[];
}
