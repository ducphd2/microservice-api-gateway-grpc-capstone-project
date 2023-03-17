import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.type';
import { Merchant, MerchantBranch } from './merchant.type';
import { Profile } from './profile.type';

@ObjectType()
export class ResponseLoginGrpc {
  @Field(() => User)
  user: User;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}

@ObjectType()
export class ResponseRegisterGrpc extends ResponseLoginGrpc {
  @Field(() => Merchant)
  merchant?: Merchant;

  @Field(() => MerchantBranch)
  merchantBranch?: MerchantBranch;
}
