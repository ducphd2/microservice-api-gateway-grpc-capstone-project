import { Field, ObjectType } from '@nestjs/graphql';
import { Metadata } from 'grpc';
import { Observable } from 'rxjs';
import { IId, IQuery } from '../../../commons/commons.interface';
import { User } from '../../../types';
import { Profile } from '../../../types/profile.type';
import { InputPermissionRequest } from '../dtos/inputPermissionRequest.dto';
import { InputRegisterRequest } from '../dtos/inputRegisterRequest.dto';
import { IUsersConnection } from './users.interface';

ObjectType();
export class ResponsePermission {
  @Field(() => Boolean)
  isAdmin: boolean;
}

export interface IUserServiceGrpc {
  find(query: IQuery, metadata?: Metadata): Observable<IUsersConnection>;
  findById(id: IId, metadata?: Metadata): Observable<User>;
  isAdmin(data: InputPermissionRequest): Observable<ResponsePermission>;
  update(data: UpdateDataRequest): Observable<User>;
}

export class UpdateDataRequest {
  id: number;
  data: Partial<InputRegisterRequest>;
}
