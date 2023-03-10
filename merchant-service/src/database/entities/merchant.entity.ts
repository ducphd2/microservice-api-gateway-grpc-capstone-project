import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

@Entity({ tableName: 'merchants' })
export class Merchant extends BaseEntity {
  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: false })
  phone!: string;

  @Property({ nullable: false })
  address!: string;

  @Property({ nullable: true })
  cityCode: number;

  @Property({ nullable: true })
  districtCode: number;

  @Property({ nullable: true })
  wardCode: number;

  @Property({ nullable: false })
  profileId: number;
}
