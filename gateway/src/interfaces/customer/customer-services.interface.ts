import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { CreateUserInputDto, Customer, CustomerPaginationResponse, DeviceConnection } from '../../types';
import { ICount, IId, IQuery, IQueryV2 } from '../commons.interface';
import { ICustomersConnection, UpdateCustomerInput } from './customer.interface';

export interface ICustomerServiceGrpc {
  find(query: IQuery, metadata?: Metadata): Observable<ICustomersConnection>;
  findOne(query: IQuery, metadata?: Metadata): Observable<Customer>;
  findById(id: IId, metadata?: Metadata): Observable<Customer>;
  findByUserId(id: IId, metadata?: Metadata): Observable<Customer>;
  findAll(query: IQueryV2, metadata?: Metadata): Observable<CustomerPaginationResponse>;

  update(data: UpdateCustomerInput): Observable<Customer>;
  create(data: CreateUserInputDto): Observable<Customer>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
  destroy(query?: IId, metadata?: Metadata): Observable<ICount>;
}
