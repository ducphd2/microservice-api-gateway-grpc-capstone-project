import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { ICount, IId, IQuery } from '../../interfaces';
import { CreateUserInputDto, ResponseAuthGrpc, User } from '../../types';
import { InputLoginRequest } from '../dtos/inputLoginRequest.dto';
import { InputRegisterRequest } from '../dtos/inputRegisterRequest.dto';

export interface IUserServiceGrpc {
  register(data: InputRegisterRequest): Observable<ResponseAuthGrpc>;
  login(data: InputLoginRequest): Observable<ResponseAuthGrpc>;
  findById(id: IId, metadata?: Metadata): Observable<User>;
  findOne(query: IQuery, metadata?: Metadata): Observable<User>;
  create(data: CreateUserInputDto): Observable<User>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
}
