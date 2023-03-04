import { Property, PrimaryKey } from '@mikro-orm/core';

export const getDateInSeconds = (date: Date): number =>
  Math.floor(date.getTime() / 1000);

export const getCurrentDateInSecond = getDateInSeconds(new Date());

export abstract class BaseEntity {
  @PrimaryKey({
    autoincrement: true,
  })
  id!: number;

  @Property({
    type: 'bigint',
    default: getCurrentDateInSecond,
  })
  createdAt: number = getCurrentDateInSecond;

  @Property({
    type: 'bigint',
    onUpdate: () => new Date(),
    default: getCurrentDateInSecond,
  })
  updatedAt: number = getCurrentDateInSecond;
}
