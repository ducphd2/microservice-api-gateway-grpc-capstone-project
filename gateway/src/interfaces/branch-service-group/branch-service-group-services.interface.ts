import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { BranchServiceGroup, BranchServiceGroupConnection } from '../../types';
import { ICount, IId, IQuery } from '../commons.interface';
import { ICreateBranchServiceGroupInput, IUpdateBranchServiceGroupInput } from './branch-service-group.interface';

export interface IBranchServiceGroupServiceGrpc {
  find(query: IQuery, metadata?: Metadata): Observable<BranchServiceGroupConnection>;
  findById(id: IId, metadata?: Metadata): Observable<BranchServiceGroup>;
  findByBranchId(query: IQuery, metadata?: Metadata): Observable<BranchServiceGroupConnection>;
  findOne(query: IQuery, metadata?: Metadata): Observable<BranchServiceGroup>;
  create(input: ICreateBranchServiceGroupInput, metadata?: Metadata): Observable<BranchServiceGroup>;
  update(input: IUpdateBranchServiceGroupInput, metadata?: Metadata): Observable<BranchServiceGroup>;
  count(query?: IQuery, metadata?: Metadata): Observable<ICount>;
  destroy(query?: IId, metadata?: Metadata): Observable<ICount>;
}
