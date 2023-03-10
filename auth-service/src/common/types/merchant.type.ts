import { BaseType } from './base.type';

export class Merchant extends BaseType {
  name: string;
  phone: string;
  address: string;
  cityCode: number;
  districtCode: number;
  wardCode: number;
}

export class MerchantBranch extends Merchant {
  merchantId: number;
}
