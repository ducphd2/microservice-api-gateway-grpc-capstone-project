import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { BranchService, BranchServiceConnection } from '../../types';
import { ICount, IId, IQuery } from '../commons.interface';
import { ICreateServiceInput, IUpdateServiceInput } from './branch-service.interface';

export interface IBranchServiceGrpc {
  find(query: IQuery, metadata?: Metadata): Observable<BranchServiceConnection>;
  findById(id: IId, metadata?: Metadata): Observable<BranchService>;
  findByBranchId(query: IQuery, metadata?: Metadata): Observable<BranchServiceConnection>;
  findOne(query: IQuery, metadata?: Metadata): Observable<BranchService>;
  create(input: ICreateServiceInput, metadata?: Metadata): Observable<BranchService>;
  update(input: IUpdateServiceInput, metadata?: Metadata): Observable<BranchService>;
  count(query?: IQuery, metadata?: Metadata): Observable<ICount>;
  destroy(query?: IId, metadata?: Metadata): Observable<ICount>;
}
