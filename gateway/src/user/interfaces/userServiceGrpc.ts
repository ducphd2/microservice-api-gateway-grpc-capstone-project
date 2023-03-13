import { Field, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { InputPermissionRequest } from '../dtos/inputPermissionRequest.dto';
import { IId } from '../../commons/commons.interface';
import { Metadata } from '@grpc/grpc-js';
import { User } from '../../types';
import { Profile } from '../../types/profile.type';
import { InputRegisterRequest } from '../dtos/inputRegisterRequest.dto';

ObjectType();
export class ResponsePermission {
  @Field(() => Boolean)
  isAdmin: boolean;
}

export interface IUserServiceGrpc {
  findById(id: IId, metadata?: Metadata): Observable<UserFindByIdResponse>;
  isAdmin(data: InputPermissionRequest): Observable<ResponsePermission>;
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
  data: Partial<InputRegisterRequest>;
}
