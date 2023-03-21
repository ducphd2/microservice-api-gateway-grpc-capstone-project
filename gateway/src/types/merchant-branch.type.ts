import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { BaseType, PageInfo } from './base.type';

@ObjectType()
export class MerchantBranch extends BaseType {
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

  @Field(() => Int)
  merchantId: number;
}

@ObjectType()
export class MerchantBranchEdge {
  @Field(() => MerchantBranch)
  node: MerchantBranch;

  @Field(() => String)
  cursor: string;
}

@ObjectType()
export class MerchantBranchConnection {
  @Field(() => [MerchantBranchEdge])
  edges: MerchantBranchEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
