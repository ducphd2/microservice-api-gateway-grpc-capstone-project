import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { ICount, IId, IQuery } from '../../../interfaces';
import { CreateBranchInput, MerchantBranch, MerchantBranchConnection } from '../../../types';
import { IUpdateMerchantBranch } from '../../../interfaces/merchants-branch';

export interface IMerchantBranchServiceGrpc {
  find(query: IQuery, metadata?: Metadata): Observable<MerchantBranchConnection>;
  findById(id: IId, metadata?: Metadata): Observable<MerchantBranch>;
  findByUserId(query: IQuery, metadata?: Metadata): Observable<MerchantBranchConnection>;
  findOne(query: IQuery, metadata?: Metadata): Observable<MerchantBranch>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
  create(input: CreateBranchInput, metadata?: Metadata): Observable<MerchantBranch>;
  update(input: IUpdateMerchantBranch, metadata?: Metadata): Observable<MerchantBranch>;
  destroy(query: IId, metadata?: Metadata): Observable<ICount>;
}
