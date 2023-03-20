import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { InputLoginRequest } from '../../../auth/dtos/inputLoginRequest.dto';
import { InputRegisterRequest } from '../../../auth/dtos/inputRegisterRequest.dto';
import { ICount, IId, IQuery } from '../../../interfaces';
import { CreateUserInputDto, ResponseAuthGrpc, User } from '../../../types';
import { UpdateDataRequest } from './userServiceGrpc';
import { IUserConn } from './users.interface';

export interface IUserServiceGrpc {
  find(query: IQuery, metadata?: Metadata): Observable<IUserConn>;
  findById(id: IId, metadata?: Metadata): Observable<User>;
  update(data: UpdateDataRequest): Observable<User>;

  register(data: InputRegisterRequest): Observable<ResponseAuthGrpc>;
  login(data: InputLoginRequest): Observable<ResponseAuthGrpc>;

  findById(id: IId, metadata?: Metadata): Observable<User>;
  findOne(query: IQuery, metadata?: Metadata): Observable<User>;
  create(data: CreateUserInputDto): Observable<User>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
}
