import * as paginate from 'sequelize-cursor-pagination';
import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Service } from './service.model';
import { Branch } from './merchant-branch.model';

@Table({
  modelName: 'branch_service',
  tableName: 'branch_services',
  underscored: true,
  indexes: [{ name: 'branch_service_unique_constraint', fields: ['branch_id', 'service_id'], unique: true }],
})
export class BranchService extends BaseModel<BranchService> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Branch)
  branchId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Service)
  serviceId: number;

  @BelongsTo(() => Branch)
  branch: Branch;

  @BelongsTo(() => Service)
  service: Service;
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id',
})(BranchService);
