import * as paginate from 'sequelize-cursor-pagination';
import { Column, DataType, Table } from 'sequelize-typescript';
import { ECustomerLevel } from '../../enums';
import { BaseModel } from './base.model';

@Table({
  modelName: 'customer',
  tableName: 'customers',
  underscored: true,
})
export class Customer extends BaseModel<Customer> {
  @Column({
    type: DataType.ENUM(ECustomerLevel.NORMAL, ECustomerLevel.SILVER, ECustomerLevel.GOLD, ECustomerLevel.PLATINUM),
    allowNull: false,
    defaultValue: ECustomerLevel.NORMAL,
  })
  level: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.INTEGER,
  })
  branchId: number;

  @Column({
    type: DataType.TEXT,
  })
  referrer: string;

  @Column({
    type: DataType.TEXT,
  })
  referrerCode: string;
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id',
})(Customer);
