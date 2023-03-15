import { Field, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { InputRegisterRequest } from '../dtos/inputRegisterRequest.dto';
import { Merchant, MerchantBranch } from '../../../types';
import { ICount, IId, IQuery } from '../../../commons/commons.interface';
import { Metadata } from '@grpc/grpc-js';
import { UpdateMerchantRequestInputDto } from '../dtos/merchant';

@ObjectType()
export class AuthFromGrpcMerchantResponse {
  @Field(() => Merchant)
  merchant: Merchant;

  @Field(() => MerchantBranch)
  merchantBranch: MerchantBranch;
}

export interface IMerchantServiceGrpc {
  create(input: InputRegisterRequest, metadata?: Metadata): Observable<AuthFromGrpcMerchantResponse>;

  findMerchants(query?: IQuery, metadata?: Metadata): Observable<Merchant[]>;
  findMerchantById(id: IId, metadata?: Metadata): Observable<Merchant>;
  findOneMerchant(query?: IQuery, metadata?: Metadata): Observable<Merchant>;
  countMerchants(query?: IQuery, metadata?: Metadata): Observable<ICount>;
  updateMerchant(input: UpdateMerchantRequestInputDto): Observable<Merchant>;
  destroyMerchant(query?: IQuery, metadata?: Metadata): Observable<ICount>;

  findMerchantBranches(query?: IQuery, metadata?: Metadata): Observable<MerchantBranch[]>;
  findMerchantBranchesById(id: IId, metadata?: Metadata): Observable<MerchantBranch>;
  findOneMerchantBranch(query?: IQuery, metadata?: Metadata): Observable<MerchantBranch>;
  countMerchantBranches(query?: IQuery, metadata?: Metadata): Observable<ICount>;
  updateMerchantBranch(input: InputRegisterRequest): Observable<MerchantBranch>;
  destroyMerchantBranch(query?: IQuery, metadata?: Metadata): Observable<ICount>;
}
