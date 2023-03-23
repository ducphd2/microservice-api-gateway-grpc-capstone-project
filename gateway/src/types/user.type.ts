import { Field, HideField, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EUserGender, EUserRole, EUserStatus } from '../enums';
import { IUser } from '../modules/user/interfaces';
import { BaseType, ErrorPayload, IErrorPayload, PageInfo } from './base.type';
import { Device } from './device.type';
import { MerchantConnection } from './merchant.type';

@ObjectType()
export class User extends BaseType {
  @Field()
  email: string;

  @HideField()
  password: string;

  @Field()
  readonly fullName: string;

  @Field(() => EUserStatus)
  readonly status: EUserStatus;

  @Field(() => EUserRole)
  readonly role: EUserRole;

  @Field(() => EUserGender, { nullable: false, defaultValue: EUserGender.female })
  readonly gender: EUserGender;

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

  @Field(() => [MerchantConnection], { nullable: true })
  merchants: MerchantConnection;

  @Field(() => [Device], { nullable: true })
  devices: Device[];
}

@InputType()
export class CreateUserInputDto {
  @Field()
  readonly fullName: string;

  @Field()
  readonly email: string;

  @Field()
  readonly password: string;

  @Field(() => EUserStatus)
  @IsEnum(EUserStatus)
  @IsNotEmpty()
  readonly status: EUserStatus;

  @Field(() => EUserRole)
  @IsEnum(EUserRole)
  @IsNotEmpty()
  readonly role: EUserRole;

  @Field(() => EUserGender)
  @IsEnum(EUserGender)
  @IsNotEmpty()
  readonly gender: string;

  @Field()
  readonly contact: string;

  @Field(() => Int, { nullable: true })
  readonly dobDay: number;

  @Field(() => Int, { nullable: true })
  readonly dobMonth: number;

  @Field(() => Int, { nullable: true })
  readonly dobYear: number;

  @Field(() => String, { nullable: true })
  readonly occupation?: string;

  @Field(() => String, { nullable: true })
  readonly avatar?: string;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => Int, { nullable: true })
  cityCode?: number;

  @Field(() => Int, { nullable: true })
  districtCode?: number;
}

@ObjectType()
export class UserPayload {
  @Field(() => [ErrorPayload], { nullable: true })
  errors?: IErrorPayload[];

  @Field(() => User, { nullable: true })
  user?: IUser;
}

@ObjectType()
export class UserEdge {
  @Field(() => User)
  node: User;

  @Field(() => String)
  cursor: string;
}

@ObjectType()
export class UsersConnection {
  @Field(() => [UserEdge])
  edges: UserEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@InputType()
export class UpdateUserInputDto extends PartialType<CreateUserInputDto>(CreateUserInputDto) {}

@InputType()
export class UpdatePasswordInput {
  @Field()
  readonly currentPassword?: string;

  @Field()
  readonly newPassword?: string;

  @Field()
  readonly confirmPassword?: string;
}

@ObjectType()
export class DeleteUserPayload {
  @Field(() => [ErrorPayload], { nullable: true })
  errors?: ErrorPayload[];

  @Field(() => Int, { nullable: true })
  count?: number;
}
