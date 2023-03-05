export interface InputRegisterUserRequest {
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
}
