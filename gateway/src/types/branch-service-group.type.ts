import { Field, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { BaseType, ErrorPayload, PageInfo } from './base.type';

@ObjectType()
export class BranchServiceGroup extends BaseType {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field({ nullable: true })
  image: string;

  @Field(() => Int)
  showType: number;

  @Field(() => Int)
  branchId: number;
}

@ObjectType()
export class BranchServiceGroupEdge {
  @Field(() => BranchServiceGroup)
  node: BranchServiceGroup;

  @Field(() => String)
  cursor: string;
}

@ObjectType()
export class BranchServiceGroupConnection {
  @Field(() => [BranchServiceGroupEdge])
  edges: BranchServiceGroupEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class BranchServiceGroupPayload {
  @Field(() => [ErrorPayload], { nullable: true })
  errors?: ErrorPayload[];

  @Field(() => BranchServiceGroup, { nullable: true })
  branchServiceGroup?: BranchServiceGroup;
}

@InputType()
export class CreateBranchServiceGroupInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field({ nullable: true })
  image: string;

  @Field(() => Int)
  showType: number;

  @Field(() => Int)
  branchId: number;
}

@InputType()
export class PartialUpdateBranchServiceGroup extends PartialType<CreateBranchServiceGroupInput>(
  CreateBranchServiceGroupInput,
) {}
