import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { ICount, IId, IQuery } from '../../../interfaces';
import { Customer, User } from '../../../types';
import { ICreateCustomerInput, ICustomersConnection, IUpdateCustomerInput } from './customers.interface';

export interface ICreateCustomerResponse {
  user: User;
  customer: Customer;
}

export interface ICustomerServices {
  find(query: IQuery, metadata?: Metadata): Observable<ICustomersConnection>;
  findById(id: IId, metadata?: Metadata): Observable<Customer>;
  findOne(query: IQuery, metadata?: Metadata): Observable<Customer>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
  create(input: ICreateCustomerInput, metadata?: Metadata): Observable<ICreateCustomerResponse>;
  update(input: IUpdateCustomerInput): Observable<ICreateCustomerResponse>;
  destroy(query: IQuery, metadata?: Metadata): Observable<ICount>;
}
