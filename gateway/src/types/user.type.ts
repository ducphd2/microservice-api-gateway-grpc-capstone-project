import { Field, HideField, InputType, Int, ObjectType } from '@nestjs/graphql';
import { EUserGender, EUserRole } from '../enums';
import { IUser, IUserConn, IUserPayload } from '../modules/user/interfaces';
import { BaseType, ErrorPayload, IErrorPayload, PageInfo } from './base.type';
import { Device } from './device.type';
import { Merchant } from './merchant.type';
import { IModelEdge, IPageInfo } from '../interfaces';

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

  @Field(() => [Merchant], { nullable: 'itemsAndList' })
  merchants: Merchant[];

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

  @Field()
  readonly status: string;

  @Field()
  readonly role: string;

  @Field()
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
export class UserPayload implements IUserPayload {
  @Field(() => [ErrorPayload], { nullable: true })
  errors?: IErrorPayload[];

  @Field(() => User, { nullable: true })
  user?: IUser;
}

@ObjectType()
export class UsersConnection implements IUserConn {
  @Field(() => [UserEdge])
  edges: UserEdge[];

  @Field(() => PageInfo)
  pageInfo: IPageInfo;
}

@ObjectType()
export class UserEdge implements IModelEdge<IUser> {
  @Field(() => User)
  node: IUser;

  @Field(() => String)
  cursor: string;
}

@ObjectType()
export class DeleteUserPayload {
  @Field(() => [ErrorPayload], { nullable: true })
  errors?: ErrorPayload[];

  @Field(() => Int, { nullable: true })
  count?: number;
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
