import { Observable } from 'rxjs';
import { Merchant, MerchantBranch } from '../../common/types';
import { InputRegisterRequest } from '../dto/create-merchant.dto';

export class AuthFromGrpcMerchantResponse {
  merchant: Merchant;
  merchantBranch: MerchantBranch;
}

export interface MerchantServiceGrpc {
  create(data: InputRegisterRequest): Observable<AuthFromGrpcMerchantResponse>;
}
