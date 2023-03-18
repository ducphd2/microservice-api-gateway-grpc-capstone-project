import { Field, HideField, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseType, ErrorPayload, IErrorPayload, PageInfo } from './base.type';
import { ICustomer, ICustomerEdge, IPageInfo } from '../modules/customer/interfaces';

@ObjectType()
export class Customer extends BaseType {
  @Field()
  email: string;

  @HideField()
  password: string;

  @Field(() => String)
  fullName: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  role: string;

  @Field(() => String)
  gender: string;

  @Field(() => String)
  contact: string;

  @Field(() => String)
  level: string;

  @Field(() => Int)
  dobDay: number;

  @Field(() => Int)
  dobMonth: number;

  @Field(() => Int)
  dobYear: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int, { nullable: true })
  branchId: number;

  @Field(() => String, { nullable: true })
  occupation: string;

  @Field(() => String, { nullable: true })
  avatar: string;

  @Field(() => String, { nullable: true })
  referrer: string;

  @Field(() => String, { nullable: true })
  referrerCode: string;
}

@ObjectType()
export class CustomersConnection {
  @Field(() => [CustomerEdge])
  edges: ICustomerEdge[];

  @Field(() => PageInfo)
  pageInfo: IPageInfo;
}

@ObjectType()
export class CustomerEdge {
  @Field(() => Customer)
  node: ICustomer;

  @Field(() => String)
  cursor: string;
}

@ObjectType()
export class CustomerPayload {
  @Field(() => [ErrorPayload], { nullable: true })
  errors?: IErrorPayload[];

  @Field(() => Customer, { nullable: true })
  customer?: ICustomer;
}

@ObjectType()
export class DeleteCustomerPayload {
  @Field(() => [ErrorPayload], { nullable: true })
  errors?: ErrorPayload[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@InputType()
export class CreateCustomerInputDto {
  @Field()
  readonly fullName: string;

  @Field()
  readonly email: string;

  @Field()
  readonly password: string;

  @Field()
  readonly status: string;

  @Field()
  readonly role: string;

  @Field()
  readonly gender: string;

  @Field()
  readonly contact: string;

  @Field()
  readonly dobDay: number;

  @Field()
  readonly dobMonth: number;

  @Field()
  readonly dobYear: number;

  @Field(() => String, { nullable: true })
  readonly occupation?: string;

  @Field(() => String, { nullable: true })
  readonly avatar?: string;

  @Field(() => String, { nullable: true })
  referrer?: string;

  @Field(() => String, { nullable: true })
  referrerCode?: string;

  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(() => String, { nullable: true })
  level?: string;

  @Field(() => Int, { nullable: true })
  branchId?: number;
}

@InputType()
export class UpdateCustomerInputDto {
  @Field()
  readonly fullName?: string;

  @Field()
  readonly password?: string;

  @Field()
  readonly dobDay?: number;

  @Field()
  readonly dobMonth?: number;

  @Field()
  readonly dobYear?: number;

  @Field()
  readonly occupation?: string;

  @Field()
  readonly avatar?: string;

  @Field()
  readonly status?: string;

  @Field()
  readonly role?: string;

  @Field()
  readonly gender?: string;

  @Field()
  readonly contact?: string;
}
