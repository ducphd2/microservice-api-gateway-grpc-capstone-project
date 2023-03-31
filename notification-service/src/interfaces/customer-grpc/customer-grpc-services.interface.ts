import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

import { IId, IQuery } from '../common';
import { ICustomerAndUserResponse } from '../user-grpc';

import { ICustomer } from './customer-grpc.interface';

export interface ICustomerServiceGrpc {
  findUserById(id: IId, metadata?: Metadata): Observable<ICustomer>;
  findOneCustomer(query: IQuery, metadata?: Metadata): Observable<ICustomerAndUserResponse>;
}
