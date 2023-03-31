import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

import { IId, IQuery } from '../common';

import { ICustomerAndUserResponse, IUser } from './user-grpc.interface';

export interface IUserServiceGrpc {
  findUserById(id: IId, metadata?: Metadata): Observable<IUser>;
  findOneCustomer(query: IQuery, metadata?: Metadata): Observable<ICustomerAndUserResponse>;
}
