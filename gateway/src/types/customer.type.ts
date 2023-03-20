import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ECustomerLevel, EUserRole } from '../enums';
import { ICustomer, ICustomerEdge, IPageInfo } from '../modules/customer/interfaces';
import { ErrorPayload, IErrorPayload, PageInfo } from './base.type';
import { User } from './user.type';

@ObjectType()
export class Customer extends User {
  @Field(() => EUserRole, { defaultValue: EUserRole.user })
  role: EUserRole;

  @Field(() => String)
  contact: string;

  @Field(() => ECustomerLevel, { defaultValue: ECustomerLevel.normal })
  level: ECustomerLevel;

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
