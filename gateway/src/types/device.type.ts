import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseType, PageInfo } from './base.type';

@ObjectType()
export class Device extends BaseType {
  @Field(() => ID)
  userId: number;

  @Field(() => String)
  os: string;

  @Field(() => String)
  deviceId: string;

  @Field(() => String)
  token: string;
}

@ObjectType()
export class DeviceEdge {
  @Field(() => Device)
  node: Device;

  @Field(() => String)
  cursor: string;
}

@ObjectType()
export class DeviceConnection {
  @Field(() => [DeviceEdge])
  edges: DeviceEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
