import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { CreateBranchInput, MerchantBranch, MerchantBranchConnection } from '../../types';
import { ICount, IId, IQuery } from '../commons.interface';
import { ICreateBranchInput, IUpdateMerchantBranch } from './branch.interface';

export interface IBranchServiceGrpc {
  find(query: IQuery, metadata?: Metadata): Observable<MerchantBranchConnection>;
  findById(id: IId, metadata?: Metadata): Observable<MerchantBranch>;
  findByUserId(query: IQuery, metadata?: Metadata): Observable<MerchantBranchConnection>;
  findOne(query: IQuery, metadata?: Metadata): Observable<MerchantBranch>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
  create(input: ICreateBranchInput, metadata?: Metadata): Observable<MerchantBranch>;
  update(input: IUpdateMerchantBranch, metadata?: Metadata): Observable<MerchantBranch>;
  destroy(query: IId, metadata?: Metadata): Observable<ICount>;
}
