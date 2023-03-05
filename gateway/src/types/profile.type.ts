import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseType } from './base.type';

export enum ProfileType {
  CUSTOMER = 1,
  EMPLOYEE = 2,
}

registerEnumType(ProfileType, {
  name: 'ProfileType',
});

@ObjectType()
export class Profile extends BaseType {
  @Field(() => Int)
  userId: number;

  @Field(() => String)
  fullName: string;

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
  dateOfBirth: number;

  @Field(() => Int)
  monthOfBirth: number;

  @Field(() => Int)
  yearOfBirth: number;

  @Field(() => ProfileType)
  type: ProfileType = ProfileType.EMPLOYEE;
}

export enum CustomerLevel {
  NORMAL = 1,
  SILVER = 2,
  GOLD = 3,
  VIP = 4,
}

registerEnumType(CustomerLevel, {
  name: 'CustomerLevel',
});

@ObjectType()
export class CustomerProfile extends Profile {
  @Field(() => Int)
  profileId: number;

  @Field(() => CustomerLevel)
  level: CustomerLevel = CustomerLevel.NORMAL;
}

export enum Position {
  MANAGER = 1,
  CASHIER = 2,
  WORKER = 3,
  RECEPTIONIST = 4,
  GUARD = 5,
}

registerEnumType(Position, {
  name: 'Position',
});

@ObjectType()
export class EmployeeProfile extends Profile {
  @Field(() => Int)
  profileId: number;

  @Field(() => Position)
  position: Position = Position.WORKER;
}
