export interface InputCreateMerchantRequest {
  name: string;
  phone: string;
  address: string;
  cityCode: number;
  districtCode: number;
  wardCode: number;
  subdomain: string;
  userId: number;
}

export interface UpdateMerchantInput {
  id: number;
  data: Partial<InputCreateMerchantRequest>;
}
