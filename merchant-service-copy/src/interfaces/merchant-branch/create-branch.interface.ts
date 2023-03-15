import { InputCreateMerchantRequest } from '../merchant/create-merchant.interface';

export interface CreateMerchantBranchRequestInput extends InputCreateMerchantRequest {
  merchantId: number;
}

export interface UpdateMerchantBranchInput {
  id: number;
  data: Partial<CreateMerchantBranchRequestInput>;
}
