import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { MerchantBranch } from './merchant-branch.model';
import * as paginate from 'sequelize-cursor-pagination';
import { BranchServiceGroups } from './branch-service-group.model';
import { Merchant } from './merchant.model';

@Table({
  modelName: 'branch_service',
  tableName: 'branch_services',
  underscored: true,
})
export class BranchServices extends BaseModel<BranchServices> {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.FLOAT,
  })
  capitalPrice: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  durationHour: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  durationMinute: number;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  canEditPriceInPay: boolean;

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
  status: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  canPrintHouseInInvoice: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => BranchServiceGroups)
  serviceGroupId: number;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => Merchant)
  merchantId: number;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => MerchantBranch)
  branchId: number;

  @BelongsTo(() => BranchServiceGroups)
  branchServiceGroup: BranchServiceGroups;

  @BelongsTo(() => MerchantBranch)
  branch: MerchantBranch;

  @BelongsTo(() => Merchant)
  merchant: Merchant;
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id',
})(BranchServices);
