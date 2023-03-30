import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { BranchService, BranchServiceConnection, BranchServicePaginationResponse } from '../../types';
import { ICount, IId, IQuery, IQueryV2 } from '../commons.interface';
import { ICreateBranchServiceInput, IUpdateBranchServiceInput } from './branch-service.interface';

export interface IBranchServiceGrpc {
  find(query: IQuery, metadata?: Metadata): Observable<BranchServiceConnection>;
  findByMerchantId(query: IQueryV2, metadata?: Metadata): Observable<BranchServicePaginationResponse>;
  findAll(query: IQueryV2, metadata?: Metadata): Observable<BranchServicePaginationResponse>;
  findById(id: IId, metadata?: Metadata): Observable<BranchService>;
  findByBranchId(query: IQuery, metadata?: Metadata): Observable<BranchServiceConnection>;
  findOne(query: IQuery, metadata?: Metadata): Observable<BranchService>;
  create(input: ICreateBranchServiceInput, metadata?: Metadata): Observable<BranchService>;
  update(input: IUpdateBranchServiceInput, metadata?: Metadata): Observable<BranchService>;
  count(query?: IQuery, metadata?: Metadata): Observable<ICount>;
  destroy(query?: IId, metadata?: Metadata): Observable<ICount>;
}
