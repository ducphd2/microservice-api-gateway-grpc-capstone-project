import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

import { IId } from '../common';

import { IMerchant, INotificationServiceFindMerchantAndBranchDetail } from './merchant.interface';

export interface IMerchantServiceGrpc {
  findById(id: IId, metadata?: Metadata): Observable<IMerchant>;
  findMerchantAndBranchDetailByBranchServiceId(
    id: IId,
    metadata?: Metadata,
  ): Observable<INotificationServiceFindMerchantAndBranchDetail>;
}
