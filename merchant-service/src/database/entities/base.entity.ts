import { Property, PrimaryKey } from '@mikro-orm/core';
import { getCurrentDateInSecond } from '../../helpers';

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
    onUpdate: () => getCurrentDateInSecond,
    default: getCurrentDateInSecond,
  })
  updatedAt: number = getCurrentDateInSecond;
}
