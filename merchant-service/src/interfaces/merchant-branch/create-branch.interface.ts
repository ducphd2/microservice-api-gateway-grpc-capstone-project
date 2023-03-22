export interface CreateMerchantBranchInput {
  name?: string;
  phone?: string;
  address?: string;
  cityCode?: number;
  districtCode?: number;
  wardCode?: number;
  merchantId?: number;
}

export interface UpdateMerchantBranchInput {
  id: number;
  data: Partial<CreateMerchantBranchInput>;
}
