import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { ICount, IQuery } from '../commons.interface';
import { IMerchantBranchConnection } from './branch.interface';

export interface IMerchantServiceGrpc {
  find(query: IQuery, metadata?: Metadata): Observable<IMerchantBranchConnection>;
  count(query?: IQuery, metadata?: Metadata): Observable<ICount>;
  destroy(query?: IQuery, metadata?: Metadata): Observable<ICount>;
}
