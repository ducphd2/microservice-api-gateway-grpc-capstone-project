import { Metadata } from '@grpc/grpc-js';
import { Field, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { ICount, IId, IQuery } from '../../../commons/commons.interface';
import { MerchantBranch } from '../../../types';
import { BranchDto } from '../dtos';

export interface UpdateBranchInput {
  id: number;
  data: BranchDto;
}

export interface ErrorPayload {
  field?: string;
  message?: string[];
}

export interface DeleteBranchPayload {
  errors?: ErrorPayload[];
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
  update(input: UpdateBranchInput): Observable<MerchantBranch>;
  destroy(query?: IQuery, metadata?: Metadata): Observable<ICount>;
  delete(id: IId, metadata?: Metadata): Observable<ICount>;
}
