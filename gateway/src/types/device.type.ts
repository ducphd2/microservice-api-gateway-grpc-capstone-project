import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { BaseType } from './base.type';

@ObjectType()
export class Device extends BaseType {
  @Field(() => String)
  name: string;

  @Field(() => ID)
  ownerId: number;

  @Field(() => Int)
  os: number;

  @Field(() => String)
  deviceId: string;

  @Field(() => String)
  token: string;
}
