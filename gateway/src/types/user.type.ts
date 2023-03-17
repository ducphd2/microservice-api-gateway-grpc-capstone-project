import { Field, HideField, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseType, ErrorPayload, IErrorPayload } from './base.type';

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

export interface IUserPayload {
  errors?: IErrorPayload[];
  user?: IUser;
}

@ObjectType()
export class UserPayload implements IUserPayload {
  @Field(() => [ErrorPayload], { nullable: true })
  errors?: IErrorPayload[];

  @Field(() => User, { nullable: true })
  user?: IUser;
}

export interface IUser {
  email?: string;
  password?: string;
  fullName?: string;
  status?: string;
  role?: string;
  gender?: string;
  contact?: string;
  dobDay?: number;
  dobMonth?: number;
  dobYear?: number;
  occupation?: string;
  avatar?: string;
  id?: number;
  createdAt?: number;
  updatedAt?: number;
}
