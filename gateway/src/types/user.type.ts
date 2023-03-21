import { Field, HideField, InputType, Int, ObjectType } from '@nestjs/graphql';
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

  @Field()
  readonly status: string;

  @Field(() => EUserRole, { defaultValue: EUserRole.user })
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
  readonly status: string;

  @Field(() => EUserRole)
  @IsEnum(EUserRole)
  @IsNotEmpty()
  readonly role: string;

  @Field(() => EUserGender)
  @IsEnum(EUserGender)
  @IsNotEmpty()
  readonly gender: string;

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
export class UpdateUserInputDto extends User {}

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
