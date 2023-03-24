import { Field, ObjectType } from '@nestjs/graphql';
import { User, UserIncludeCustomer } from './user.type';
import { IUserIncludeCustomer } from '../interfaces/users';
import { Customer } from './customer.type';

@ObjectType()
export class ResponseAuthGrpc {
  @Field(() => User)
  user: User;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}

@ObjectType()
export class CustomerLoginResponse {
  @Field(() => User)
  user: User;

  @Field(() => Customer)
  customer: Customer;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
