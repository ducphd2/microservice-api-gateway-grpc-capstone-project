import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../types';
import { Profile } from '../../../types/profile.type';

ObjectType();
export class ResponsePermission {
  @Field(() => Boolean)
  isAdmin: boolean;
}

@ObjectType()
export class UserFindByIdResponse {
  @Field(() => User)
  user: User;

  @Field(() => Profile)
  profile: Profile;
}
