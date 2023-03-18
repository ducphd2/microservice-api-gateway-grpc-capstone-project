import { Metadata } from 'grpc';
import { Observable } from 'rxjs';
import { ICount, IId, IQuery } from '../../../commons/commons.interface';
import { Customer, CustomersConnection } from '../../../types';
import { CustomerDto } from '../dtos';
import { IUser } from '../../user/interfaces';

export interface UpdateCustomerInput {
  id: number;
  data: CustomerDto;
}

export interface CreateCustomerInput {
  user: IUser;
  customer: ICustomer;
}

export interface ICustomerServices {
  find(query: IQuery, metadata?: Metadata): Observable<ICustomersConnection>;
  findById(id: IId, metadata?: Metadata): Observable<Customer>;
  findOne(query: IQuery, metadata?: Metadata): Observable<Customer>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
  create(input: CreateCustomerInput, metadata?: Metadata): Observable<CreateCustomerInput>;
  update(input: UpdateCustomerInput): Observable<Customer>;
  destroy(query: IQuery, metadata?: Metadata): Observable<ICount>;
}

export interface ICustomer {
  id?: number;
  email?: string;
  password?: string;
  fullName?: string;
  status?: string;
  role?: string;
  gender?: string;
  contact?: string;
  dobDay?: number;
  dobMonth?: number;
  dobYear?: number;
  occupation?: string;
  avatar?: string;
  createdAt?: number;
  updatedAt?: number;
  userId?: number;
  branchId?: number;
  referrer?: string;
  referrerCode?: string;
}

export interface IPageInfo {
  startCursor?: string;
  endCursor?: string;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export interface ICustomerEdge {
  node: ICustomer;
  cursor: string;
}

export interface ICustomersConnection {
  edges: ICustomerEdge[];
  pageInfo: IPageInfo;
}
