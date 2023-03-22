import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseType, ErrorPayload, PageInfo } from './base.type';

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

@ObjectType()
export class MerchantBranchPayload {
  @Field(() => [ErrorPayload], { nullable: true })
  errors?: ErrorPayload[];

  @Field(() => MerchantBranch, { nullable: true })
  branch?: MerchantBranch;
}

@InputType()
export class CreateBranchInput {
  @Field()
  fullName: string;

  @Field(() => String, { nullable: true })
  relatedUserPhone?: string;
}
