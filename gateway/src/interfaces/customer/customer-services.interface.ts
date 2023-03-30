import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { Customer, CustomerPaginationResponse, RegisterCustomer } from '../../types';
import { ICount, IId, IQuery, IQueryV2 } from '../commons.interface';
import {
  ICreateCustomerInput,
  ICreateCustomerResponse,
  ICustomer,
  ICustomersConnection,
  IUpdateCustomerInput,
} from './customer.interface';

export interface ICustomerServiceGrpc {
  find(query: IQuery, metadata?: Metadata): Observable<ICustomersConnection>;
  findOne(query: IQuery, metadata?: Metadata): Observable<Customer>;
  findById(id: IId, metadata?: Metadata): Observable<ICustomer>;
  findByUserId(id: IId, metadata?: Metadata): Observable<ICustomer>;
  findAll(query: IQueryV2, metadata?: Metadata): Observable<CustomerPaginationResponse>;

  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
  destroy(query?: IQuery, metadata?: Metadata): Observable<ICount>;

  create(input: ICreateCustomerInput, metadata?: Metadata): Observable<ICreateCustomerResponse>;
  register(input: RegisterCustomer, metadata?: Metadata): Observable<ICreateCustomerResponse>;
  update(input: IUpdateCustomerInput): Observable<ICreateCustomerResponse>;
}
