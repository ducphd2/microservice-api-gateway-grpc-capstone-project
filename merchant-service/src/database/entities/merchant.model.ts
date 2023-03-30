import { Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { MerchantBranch } from './merchant-branch.model';

import * as paginate from 'sequelize-cursor-pagination';
import { BranchServices } from './branch-service.model';

@Table({
  modelName: 'merchant',
  tableName: 'merchants',
  underscored: true,
})
export class Merchant extends BaseModel<Merchant> {
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
  userId: number;

  @HasMany(() => MerchantBranch)
  branches: MerchantBranch[];

  @HasMany(() => BranchServices)
  branchServices: BranchServices[];
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id',
})(Merchant);
