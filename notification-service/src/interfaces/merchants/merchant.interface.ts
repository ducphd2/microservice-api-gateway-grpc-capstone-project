export interface IMerchant {
  id?: number;
  name?: string;
  phone?: string;
  address?: string;
  cityCode?: number;
  districtCode?: number;
  wardCode?: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IMerchantBranch {
  id?: number;
  name?: string;
  phone?: string;
  address?: string;
  cityCode?: number;
  districtCode?: number;
  wardCode?: number;
  userId?: number;
  merchantId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface INotificationServiceFindMerchantAndBranchDetail {
  merchant: IMerchant;
  branch: IMerchantBranch;
}
