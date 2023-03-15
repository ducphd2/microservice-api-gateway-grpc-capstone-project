import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table({
  tableName: 'products',
  underscored: true,
})
export class Product extends BaseModel {
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
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;
}
