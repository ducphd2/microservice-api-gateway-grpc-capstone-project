import { Field, ObjectType } from '@nestjs/graphql';
import { Metadata } from 'grpc';
import { Observable } from 'rxjs';
import { IId } from '../../../commons/commons.interface';
import { User } from '../../../types';
import { Profile } from '../../../types/profile.type';
import { CustomerDto } from '../dtos';

ObjectType();
export class ResponsePermission {
  @Field(() => Boolean)
  isAdmin: boolean;
}

export interface IUserServiceGrpc {
  findById(id: IId, metadata?: Metadata): Observable<UserFindByIdResponse>;
  update(data: UpdateDataRequest): Observable<UserFindByIdResponse>;
}

@ObjectType()
export class UserFindByIdResponse {
  @Field(() => User)
  user: User;

  @Field(() => Profile)
  profile: Profile;
}

export class UpdateDataRequest {
  id: number;
  data: CustomerDto;
}
