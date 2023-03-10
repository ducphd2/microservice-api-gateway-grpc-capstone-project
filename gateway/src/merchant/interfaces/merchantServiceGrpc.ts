import { Field, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Merchant, MerchantBranch } from '../../types';
import { InputRegisterRequest } from '../dtos/inputRegisterRequest.dto';

@ObjectType()
export class AuthFromGrpcMerchantResponse {
  @Field(() => Merchant)
  merchant: Merchant;

  @Field(() => MerchantBranch)
  merchantBranch: MerchantBranch;
}

export interface MerchantServiceGrpc {
  create(data: InputRegisterRequest): Observable<AuthFromGrpcMerchantResponse>;
}
