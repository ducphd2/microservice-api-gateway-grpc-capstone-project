import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseType } from './base.type';
import { Product } from './product.type';

@ObjectType()
export class Stock extends BaseType {
  @Field(() => Int)
  branchId: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => [Product], { nullable: true })
  products: Product[];

  @Field(() => String, { nullable: true })
  address: string;
}
