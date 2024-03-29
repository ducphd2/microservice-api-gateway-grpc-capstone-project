import { Field, ID, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { BaseType, PageInfo } from './base.type';
import { EDeviceOs } from '../enums';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

@InputType()
export class DeviceInputDto {
  @Field(() => EDeviceOs)
  @IsEnum(EDeviceOs)
  @IsString()
  @IsNotEmpty()
  os: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  token: string;
}

@InputType()
export class PartialAuthDeviceInputDto extends PartialType<DeviceInputDto>(DeviceInputDto) {}
