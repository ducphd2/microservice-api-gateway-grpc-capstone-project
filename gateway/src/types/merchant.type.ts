import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { BaseType, PageInfo } from './base.type';
import { MerchantBranchConnection } from './merchant-branch.type';

@ObjectType()
export class Merchant extends BaseType {
  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  address: string;

  @Field(() => Int)
  cityCode: number;

  @Field(() => Int)
  districtCode: number;

  @Field(() => Int)
  wardCode: number;

  @Field(() => ID)
  userId: number;

  @Field(() => [MerchantBranchConnection], { nullable: true })
  branches: MerchantBranchConnection;
}

@ObjectType()
export class MerchantEdge {
  @Field(() => Merchant)
  node: Merchant;

  @Field(() => String)
  cursor: string;
}

@ObjectType()
export class MerchantConnection {
  @Field(() => [MerchantEdge])
  edges: MerchantEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
