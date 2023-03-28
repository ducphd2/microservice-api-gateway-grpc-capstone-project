import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { MerchantBranch } from './merchant-branch.model';
import * as paginate from 'sequelize-cursor-pagination';

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
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id',
})(BranchServiceGroups);
