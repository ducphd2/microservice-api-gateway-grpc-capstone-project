import { Field, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { BaseType, ErrorPayload, PageInfo } from './base.type';
import { BranchService, BranchServiceConnection } from './branch-service.type';
import { EBranchServiceShowType } from '../enums';

@ObjectType()
export class BranchServiceGroup extends BaseType {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  showType: number;

  @Field(() => Int)
  merchantId: number;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  thumbnailUrl: string;

  @Field(() => [BranchServiceConnection], { nullable: true })
  services: BranchServiceConnection;
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

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  thumbnailUrl: string;

  @Field(() => EBranchServiceShowType)
  showType: EBranchServiceShowType;

  @Field(() => Int)
  merchantId: number;
}

@InputType()
export class PartialUpdateBranchServiceGroup extends PartialType<CreateBranchServiceGroupInput>(
  CreateBranchServiceGroupInput,
) {}
