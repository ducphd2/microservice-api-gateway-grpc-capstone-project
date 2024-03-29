import { Field, HideField, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { ECustomerLevel, EUserGender, EUserRole, EUserStatus } from '../enums';
import { BaseType, ErrorPayload, IErrorPayload, PageInfo } from './base.type';
import { UpdateUserInputDto, User } from './user.type';

@ObjectType()
export class Customer extends BaseType {
  @Field(() => ECustomerLevel, { defaultValue: ECustomerLevel.normal })
  level: ECustomerLevel;

  @Field(() => String, { nullable: true })
  referrer: string;

  @Field(() => String, { nullable: true })
  referrerCode: string;

  @Field(() => Int, { nullable: true })
  userId: number;

  @Field(() => Int, { nullable: true })
  branchId?: number;

  @Field(() => String, { nullable: true })
  customerCode?: string;

  @Field(() => String, { nullable: true })
  facebook?: string;

  @Field(() => String, { nullable: true })
  zaloPhone?: string;

  @Field(() => Int, { nullable: true })
  height?: number;

  @Field(() => Int, { nullable: true })
  weight?: number;

  @Field(() => Int, { nullable: true })
  memberCardNo?: number;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => Int, { nullable: true })
  cityCode?: number;

  @Field(() => Int, { nullable: true })
  districtCode?: number;

  @Field(() => String, { nullable: true })
  company?: string;

  @Field(() => String, { nullable: true })
  taxNo?: string;

  @Field(() => String, { nullable: true })
  note?: string;

  @Field(() => String, { nullable: true })
  relatedUser?: string;

  @Field(() => String, { nullable: true })
  relatedUserRole?: string;

  @Field(() => String, { nullable: true })
  relatedUserPhone?: string;
}

@ObjectType()
export class CustomersConnection {
  @Field(() => [CustomerEdge])
  edges: CustomerEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class CustomerEdge {
  @Field(() => Customer)
  node: Customer;

  @Field(() => String)
  cursor: string;
}

@ObjectType()
export class CustomerPayload {
  @Field(() => [ErrorPayload], { nullable: true })
  errors?: IErrorPayload[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Customer, { nullable: true })
  customer?: Customer;
}

@ObjectType()
export class DeleteCustomerPayload {
  @Field(() => [ErrorPayload], { nullable: true })
  errors?: ErrorPayload[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@InputType()
export class CreateCustomerInput {
  @Field(() => Int)
  branchId?: number;

  @Field(() => String, { nullable: true })
  level?: string;

  @Field(() => String, { nullable: true })
  referrer: string;

  @Field(() => String, { nullable: true })
  referrerCode: string;

  @Field(() => String, { nullable: true })
  customerCode?: string;

  @Field(() => String, { nullable: true })
  facebook?: string;

  @Field(() => String, { nullable: true })
  zaloPhone?: string;

  @Field(() => Int, { nullable: true })
  height?: number;

  @Field(() => Int, { nullable: true })
  weight?: number;

  @Field(() => String, { nullable: true })
  memberCardNo?: string;

  @Field(() => String, { nullable: true })
  company?: string;

  @Field(() => String, { nullable: true })
  taxNo?: string;

  @Field(() => String, { nullable: true })
  note?: string;

  @Field(() => String, { nullable: true })
  relatedUser?: string;

  @Field(() => String, { nullable: true })
  relatedUserRole?: string;

  @Field(() => String, { nullable: true })
  relatedUserPhone?: string;
}

@InputType()
export class PartialUpdateCustomer extends PartialType<CreateCustomerInput>(CreateCustomerInput) {}

@InputType()
export class TestUpdateDto {
  @Field(() => UpdateUserInputDto)
  userInput: UpdateUserInputDto;

  @Field(() => PartialUpdateCustomer)
  customerInput: PartialUpdateCustomer;
}

@InputType()
export class UserInput {
  @Field({ nullable: true })
  fullName?: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => EUserGender, { nullable: true })
  gender?: string;

  @Field({ nullable: true })
  contact?: string;

  @Field(() => Int, { nullable: true })
  dobDay?: number;

  @Field(() => Int, { nullable: true })
  dobMonth?: number;

  @Field(() => Int, { nullable: true })
  dobYear?: number;

  @Field(() => String, { nullable: true })
  occupation?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => Int, { nullable: true })
  cityCode?: number;

  @Field(() => Int, { nullable: true })
  districtCode?: number;

  @Field(() => EUserStatus, { defaultValue: EUserStatus.active })
  status?: string;

  @Field(() => EUserRole, { defaultValue: EUserRole.user })
  role?: EUserRole;
}

@InputType()
export class RegisterCustomer {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class CustomerRegisterPayload extends CustomerPayload {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}

@ObjectType()
export class CustomerPaginationResponse {
  @Field(() => [User])
  items: User[];

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  totalPage: number;

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  limit: number;
}
