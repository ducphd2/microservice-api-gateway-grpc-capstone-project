import * as paginate from 'sequelize-cursor-pagination';
import { BelongsTo, Column, DataType, ForeignKey, HasOne, Table } from 'sequelize-typescript';
import { ECustomerLevel } from '../../enums';
import { BaseModel } from './base.model';
import { User } from './user.model';

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
  @ForeignKey(() => User)
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

  @Column({
    type: DataType.TEXT,
  })
  facebook?: string;

  @Column({
    type: DataType.TEXT,
  })
  zaloPhone?: string;

  @Column({
    type: DataType.INTEGER,
  })
  height?: number;

  @Column({
    type: DataType.INTEGER,
  })
  weight?: number;

  @Column({
    type: DataType.TEXT,
  })
  memberCardNo?: string;

  @Column({
    type: DataType.TEXT,
  })
  company?: string;

  @Column({
    type: DataType.TEXT,
  })
  taxNo?: string;

  @Column({
    type: DataType.TEXT,
  })
  note?: string;

  @Column({
    type: DataType.TEXT,
  })
  relatedUser?: string;

  @Column({
    type: DataType.TEXT,
  })
  relatedUserRole?: string;

  @Column({
    type: DataType.TEXT,
  })
  relatedUserPhone?: string;

  @BelongsTo(() => User, { foreignKey: 'userId' })
  user: User;
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id',
})(Customer);
