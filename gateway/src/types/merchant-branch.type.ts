import { BaseType, ErrorPayload, PageInfo } from './base.type';
import { Field, ID, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';

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

  @Field(() => Int, { nullable: true })
  wardCode: number;

  @Field(() => Int)
  merchantId: number;

  @Field(() => Int)
  userId: number;
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
  name: string;

  @Field()
  phone: string;

  @Field()
  address: string;

  @Field(() => Int)
  merchantId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  cityCode: number;

  @Field(() => Int)
  districtCode: number;

  @Field({ nullable: true })
  wardCode: number;
}

@InputType()
export class PartialUpdateBranch extends PartialType<CreateBranchInput>(CreateBranchInput) {}
