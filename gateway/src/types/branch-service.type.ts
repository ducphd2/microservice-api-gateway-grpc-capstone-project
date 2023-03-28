import { Field, Float, ID, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { BaseType, ErrorPayload, PageInfo } from './base.type';
import { EBranchServiceShowType, EBranchServiceStatus } from '../enums';

@ObjectType()
export class BranchService extends BaseType {
  @Field(() => Int)
  serviceGroupId: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  capitalPrice: number;

  @Field(() => Int)
  durationHour: number;

  @Field(() => Int)
  durationMinute: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  image: string;

  @Field(() => Int)
  showType: number;

  @Field(() => Int)
  status: number;

  @Field(() => Boolean, { nullable: true })
  canPrintHouseInInvoice: boolean;

  @Field(() => Boolean, { nullable: true })
  canEditPriceInPay: boolean;
}

@ObjectType()
export class BranchServiceEdge {
  @Field(() => BranchService)
  node: BranchService;

  @Field(() => String)
  cursor: string;
}

@ObjectType()
export class BranchServiceConnection {
  @Field(() => [BranchServiceEdge])
  edges: BranchServiceEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class BranchServicePayload {
  @Field(() => [ErrorPayload], { nullable: true })
  errors?: ErrorPayload[];

  @Field(() => BranchService, { nullable: true })
  branchService?: BranchService;
}

@InputType()
export class CreateBranchServiceInput {
  @Field(() => Int)
  serviceGroupId: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float, { nullable: true })
  capitalPrice: number;

  @Field(() => Int)
  durationHour: number;

  @Field(() => Int)
  durationMinute: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  canEditPriceInPay?: boolean;

  @Field({ nullable: true })
  image: string;

  @Field(() => EBranchServiceShowType)
  showType: EBranchServiceShowType;

  @Field(() => EBranchServiceStatus)
  status: EBranchServiceStatus;

  @Field(() => Boolean, { nullable: true })
  canPrintHouseInInvoice: boolean;
}

@InputType()
export class PartialUpdateBranchService extends PartialType<CreateBranchServiceInput>(CreateBranchServiceInput) {}

@InputType()
export class UpdateBranchService {
  @Field(() => Int)
  id: number;

  @Field(() => PartialUpdateBranchService)
  data: PartialUpdateBranchService;
}
