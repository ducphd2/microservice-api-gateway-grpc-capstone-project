import * as paginate from 'sequelize-cursor-pagination';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Service } from './service.model';
import { Merchant } from './merchant.model';

@Table({
  modelName: 'service_group',
  tableName: 'service_groups',
  underscored: true,
})
export class ServiceGroup extends BaseModel<ServiceGroup> {
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
  thumbnailUrl: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  showType: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Merchant)
  merchantId: number;

  @BelongsTo(() => Merchant)
  merchant: Merchant;

  @HasMany(() => Service)
  services: Service[];
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id',
})(ServiceGroup);
