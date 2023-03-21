import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { ICount, IId, IQuery } from '../../../interfaces';
import { MerchantBranch, MerchantBranchConnection } from '../../../types';

export interface IMerchantBranchServiceGrpc {
  find(query: IQuery, metadata?: Metadata): Observable<MerchantBranchConnection>;
  findById(id: IId, metadata?: Metadata): Observable<MerchantBranch>;
  findOne(query: IQuery, metadata?: Metadata): Observable<MerchantBranch>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
}
