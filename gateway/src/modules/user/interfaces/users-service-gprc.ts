import { Field, ObjectType } from '@nestjs/graphql';
import { CreateUserInputDto, ResponseLoginGrpc, ResponseRegisterGrpc, User } from '../../../types';
import { Profile } from '../../../types/profile.type';
import { ICount, IId, IQuery } from '../../../commons/commons.interface';
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { IUsersConnection } from './users.interface';
import { UpdateDataRequest } from './userServiceGrpc';
import { InputRegisterRequest } from '../../../auth/dtos/inputRegisterRequest.dto';
import { InputLoginRequest } from '../../../auth/dtos/inputLoginRequest.dto';

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

export interface IUserServiceGrpc {
  find(query: IQuery, metadata?: Metadata): Observable<IUsersConnection>;
  findById(id: IId, metadata?: Metadata): Observable<User>;
  update(data: UpdateDataRequest): Observable<User>;

  register(data: InputRegisterRequest): Observable<ResponseRegisterGrpc>;
  login(data: InputLoginRequest): Observable<ResponseLoginGrpc>;

  findById(id: IId, metadata?: Metadata): Observable<User>;
  findOne(query: IQuery, metadata?: Metadata): Observable<User>;
  create(data: CreateUserInputDto): Observable<User>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
}
