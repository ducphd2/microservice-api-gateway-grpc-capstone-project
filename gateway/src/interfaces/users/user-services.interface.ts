import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { InputLoginRequest } from '../../auth/dtos/inputLoginRequest.dto';
import { InputRegisterRequest } from '../../auth/dtos/inputRegisterRequest.dto';
import { CreateUserInputDto, DeviceConnection, ResponseAuthGrpc, User, UserPaginationResponse } from '../../types';
import { ICount, IId, IQuery, IQueryV2 } from '../commons.interface';
import { IUsersConnection, UpdateDataRequest } from './user.interface';

export interface IUserServiceGrpc {
  find(query: IQuery, metadata?: Metadata): Observable<IUsersConnection>;
  findOne(query: IQuery, metadata?: Metadata): Observable<User>;
  findById(id: IId, metadata?: Metadata): Observable<User>;
  update(data: UpdateDataRequest): Observable<User>;
  findAll(query: IQueryV2, metadata?: Metadata): Observable<UserPaginationResponse>;

  register(data: InputRegisterRequest): Observable<ResponseAuthGrpc>;
  login(data: InputLoginRequest): Observable<ResponseAuthGrpc>;

  create(data: CreateUserInputDto): Observable<User>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
  findDevices(query: IQuery, metadata?: Metadata): Observable<DeviceConnection>;
  destroy(query?: IId, metadata?: Metadata): Observable<ICount>;
}
