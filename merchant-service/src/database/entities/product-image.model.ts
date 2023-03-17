import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table({
  tableName: 'product_images',
  underscored: true,
})
export class ProductImage extends BaseModel {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  imageUrl: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;
}
