import * as paginate from 'sequelize-cursor-pagination';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { ServiceGroup } from './service-group.model';
import { BranchService } from './branch-service.model';

@Table({
  modelName: 'service',
  tableName: 'services',
  underscored: true,
})
export class Service extends BaseModel<Service> {
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
  @ForeignKey(() => ServiceGroup)
  serviceGroupId: number;

  @BelongsTo(() => ServiceGroup)
  serviceGroup: ServiceGroup;

  @HasMany(() => BranchService)
  branchServices: BranchService;
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id',
})(Service);
