import { Metadata } from '@grpc/grpc-js';
import { Field, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { MerchantBranch } from '../../../types';
import { BranchDto } from '../dtos';
import { ICount, IErrorPayload, IId, IQuery } from '../../../interfaces';

export interface IUpdateBranchInput {
  id: number;
  data: BranchDto;
}

export interface DeleteBranchPayload {
  errors?: IErrorPayload[];
  count?: number;
}

@ObjectType()
export class FindAllBranches {
  @Field(() => [MerchantBranch])
  merchantBranches: MerchantBranch[];
}

export interface MerchantBranchServiceGrpc {
  find(query?: IQuery, metadata?: Metadata): Observable<FindAllBranches>;
  findById(id: IId, metadata?: Metadata): Observable<MerchantBranch>;
  findOne(query?: IQuery, metadata?: Metadata): Observable<MerchantBranch>;
  count(query?: IQuery, metadata?: Metadata): Observable<ICount>;
  create(input: BranchDto, metadata?: Metadata): Observable<MerchantBranch>;
  update(input: IUpdateBranchInput): Observable<MerchantBranch>;
  destroy(query?: IQuery, metadata?: Metadata): Observable<ICount>;
  delete(id: IId, metadata?: Metadata): Observable<ICount>;
}
