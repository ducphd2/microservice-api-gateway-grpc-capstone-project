import { Entity, Property } from '@mikro-orm/core';
import { Merchant } from './merchant.entity';

@Entity({ tableName: 'merchant_branches' })
export class MerchantBranch extends Merchant {
  @Property()
  merchantId: number;
}
