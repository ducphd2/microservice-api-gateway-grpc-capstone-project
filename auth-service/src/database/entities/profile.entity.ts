import { Entity, Enum, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

export enum EProfileType {
  CUSTOMER = 1,
  EMPLOYEE = 2,
}

@Entity({ tableName: 'profiles' })
export class Profile extends BaseEntity {
  @Property()
  fullName: string;

  @Property()
  phone: string;

  @Enum({
    default: EProfileType.EMPLOYEE,
  })
  type: EProfileType = EProfileType.EMPLOYEE;

  @Property()
  address: string;

  @Property({ nullable: true })
  cityCode: number;

  @Property({ nullable: true })
  districtCode: number;

  @Property({ nullable: true })
  wardCode: number;

  @Property({ nullable: true })
  dateOfBirth: number;

  @Property({ nullable: true })
  monthOfBirth: number;

  @Property({ nullable: true })
  yearOfBirth: number;

  @Property()
  userId: number;
}
