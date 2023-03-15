import { Field, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { InputRegisterRequest } from '../dtos/inputRegisterRequest.dto';
import { Merchant, MerchantBranch } from '../../../types';

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
