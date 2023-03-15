import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseType } from './base.type';

@ObjectType()
export class Merchant extends BaseType {
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

  @Field(() => Int)
  wardCode: number;

  @Field(() => Int)
  profileId: number;
}

@ObjectType()
export class MerchantBranch extends Merchant {
  @Field(() => Int)
  merchantId: number;
}
