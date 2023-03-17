export interface InputCreateMerchantRequest {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  merchantPhone: string;
  merchantName: string;
  merchantAddress: string;
  cityCode: number;
  districtCode: number;
  wardCode: number;
  merchantSubdomain: string;
  userId: number;
}

export interface UpdateMerchantInput {
  id: number;
  data: Partial<InputCreateMerchantRequest>;
}
