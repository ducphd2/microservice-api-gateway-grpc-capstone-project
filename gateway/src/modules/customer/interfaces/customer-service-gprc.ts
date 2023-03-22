import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { ICount, IId, IQuery } from '../../../interfaces';
import { CreateCustomerInput, Customer, UpdateCustomerInput } from '../../../types';
import { ICustomersConnection } from './customers.interface';

export interface ICustomerServices {
  find(query: IQuery, metadata?: Metadata): Observable<ICustomersConnection>;
  findById(id: IId, metadata?: Metadata): Observable<Customer>;
  findOne(query: IQuery, metadata?: Metadata): Observable<Customer>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
  create(input: CreateCustomerInput, metadata?: Metadata): Observable<Customer>;
  update(input: UpdateCustomerInput): Observable<Customer>;
  destroy(query: IQuery, metadata?: Metadata): Observable<ICount>;
}
