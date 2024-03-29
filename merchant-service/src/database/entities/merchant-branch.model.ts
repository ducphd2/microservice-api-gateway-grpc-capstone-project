import * as paginate from 'sequelize-cursor-pagination';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Merchant } from './merchant.model';
import { BranchServiceGroups } from './branch-service-group.model';

@Table({
  modelName: 'merchant_branch',
  tableName: 'merchant_branches',
  underscored: true,
})
export class MerchantBranch extends BaseModel<MerchantBranch> {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.INTEGER,
  })
  cityCode: number;

  @Column({
    type: DataType.INTEGER,
  })
  districtCode: number;

  @Column({
    type: DataType.INTEGER,
  })
  wardCode: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Merchant)
  merchantId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => Merchant)
  merchant: Merchant;

  @HasMany(() => BranchServiceGroups)
  branchServiceGroups: BranchServiceGroups[];
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id',
})(MerchantBranch);
