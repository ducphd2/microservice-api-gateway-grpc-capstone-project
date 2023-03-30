import { BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { MerchantBranch } from './merchant-branch.model';
import * as paginate from 'sequelize-cursor-pagination';
import { BranchServices } from './branch-service.model';
import { Merchant } from './merchant.model';

@Table({
  modelName: 'branch_service_group',
  tableName: 'branch_service_groups',
  underscored: true,
})
export class BranchServiceGroups extends BaseModel<BranchServiceGroups> {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: DataType.TEXT,
  })
  image: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  showType: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => MerchantBranch)
  branchId: number;

  @BelongsTo(() => MerchantBranch)
  branch: MerchantBranch;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => Merchant)
  merchantId: number;

  @BelongsTo(() => Merchant)
  merchant: Merchant;

  @HasMany(() => BranchServices)
  branchServices: BranchServices[];
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id',
})(BranchServiceGroups);
