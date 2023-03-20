import { Field, ObjectType } from '@nestjs/graphql';
import { Merchant, MerchantBranch } from './merchant.type';
import { User } from './user.type';

@ObjectType()
export class ResponseAuthGrpc {
  @Field(() => User)
  user: User;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
