import { ArgsType, Field, HideField, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseType, ErrorPayload, IErrorPayload, PageInfo } from './base.type';
import { IPageInfo, IUser, IUserEdge, IUserPayload } from '../modules/user/interfaces';

export enum UserRole {
  SUPER_ADMIN = 1,
  ADMIN = 2,
  USER = 3,
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

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
export class UsersConnection {
  @Field(() => [UserEdge])
  edges: IUserEdge[];

  @Field(() => PageInfo)
  pageInfo: IPageInfo;
}

@ObjectType()
export class UserEdge {
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
export class UpdateUserInputDto {
  @Field()
  readonly fullName?: string;

  @Field()
  readonly password?: string;

  @Field()
  readonly dobDay?: number;

  @Field()
  readonly dobMonth?: number;

  @Field()
  readonly dobYear?: number;

  @Field()
  readonly occupation?: string;

  @Field()
  readonly avatar?: string;

  @Field()
  readonly status?: string;

  @Field()
  readonly role?: string;

  @Field()
  readonly gender?: string;

  @Field()
  readonly contact?: string;
}

@InputType()
export class UpdatePasswordInput {
  @Field()
  readonly currentPassword?: string;

  @Field()
  readonly newPassword?: string;

  @Field()
  readonly confirmPassword?: string;
}
