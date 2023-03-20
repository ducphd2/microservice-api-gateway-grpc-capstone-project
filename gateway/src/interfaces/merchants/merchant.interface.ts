import { Merchant, MerchantBranch } from '../../types';

export interface IRegisterResponse {
  merchant: Merchant;
  branch: MerchantBranch;
}

export interface IRegisterInput {
  name: string;
  phone: string;
  address: string;
  userId: number;
  cityCode: number;
  districtCode: number;
  wardCode: number;
}
