import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { InputRegisterRequest } from '../../auth/dtos/inputRegisterRequest.dto';
import { UpdateMerchantRequestInputDto } from '../../modules/merchant/dtos/merchant';
import { Merchant, MerchantBranch, MerchantConnection } from '../../types';
import { ICount, IId, IQuery, IQueryV2 } from '../commons.interface';
import { IMerchantConnection, IRegisterInput, IRegisterResponse } from './merchant.interface';

export interface IMerchantServiceGrpc {
  create(input: IRegisterInput, metadata?: Metadata): Observable<Merchant>;
  find(query: IQuery, metadata?: Metadata): Observable<MerchantConnection>;
  findById(id: IId, metadata?: Metadata): Observable<Merchant>;
  findOne(query?: IQueryV2, metadata?: Metadata): Observable<Merchant>;
  countMerchants(query?: IQuery, metadata?: Metadata): Observable<ICount>;
  updateMerchant(input: UpdateMerchantRequestInputDto): Observable<Merchant>;
  destroyMerchant(query?: IQuery, metadata?: Metadata): Observable<ICount>;

  findMerchantBranches(query?: IQuery, metadata?: Metadata): Observable<MerchantBranch[]>;
  findMerchantBranchesById(id: IId, metadata?: Metadata): Observable<MerchantBranch>;
  findOneMerchantBranch(query?: IQuery, metadata?: Metadata): Observable<MerchantBranch>;
  countMerchantBranches(query?: IQuery, metadata?: Metadata): Observable<ICount>;
  updateMerchantBranch(input: InputRegisterRequest): Observable<MerchantBranch>;
  destroyMerchantBranch(query?: IQuery, metadata?: Metadata): Observable<ICount>;

  findById(id: IId, metadata?: Metadata): Observable<Merchant>;
}
