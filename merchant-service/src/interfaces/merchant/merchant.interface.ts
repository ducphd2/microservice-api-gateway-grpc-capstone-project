import { IMerchantBranch } from '../merchant-branch';

export interface IMerchant {
  id?: number;
  name?: string;
  phone?: string;
  address?: string;
  cityCode?: number;
  districtCode?: number;
  wardCode?: number;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
  branches?: IMerchantBranch[];
}
