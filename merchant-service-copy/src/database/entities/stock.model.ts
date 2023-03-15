import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table({
  tableName: 'stocks',
  underscored: true,
})
export class Stock extends BaseModel {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  branchId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;
}
