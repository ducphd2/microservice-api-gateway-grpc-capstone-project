import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { ICount, IId, IQuery } from '../../commons/commons.interface';
import { CreateUserInputDto, ResponseLoginGrpc, ResponseRegisterGrpc, User } from '../../types';
import { InputLoginRequest } from '../dtos/inputLoginRequest.dto';
import { InputRegisterRequest } from '../dtos/inputRegisterRequest.dto';

export interface IUserServiceGrpc {
  register(data: InputRegisterRequest): Observable<ResponseRegisterGrpc>;
  login(data: InputLoginRequest): Observable<ResponseLoginGrpc>;

  findById(id: IId, metadata?: Metadata): Observable<User>;
  findOne(query: IQuery, metadata?: Metadata): Observable<User>;
  create(data: CreateUserInputDto): Observable<User>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
}
