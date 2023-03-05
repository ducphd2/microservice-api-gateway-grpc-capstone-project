import { Field, HideField, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseType } from './base.type';

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
  // @Field(() => String)
  password: string;

  @Field(() => String)
  username: string;

  @Field(() => UserRole)
  role: UserRole = UserRole.ADMIN;
}
