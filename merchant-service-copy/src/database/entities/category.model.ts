import { Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { CategoryImage } from './category-image.model';

@Table({
  tableName: 'categories',
  underscored: true,
})
export class Category extends BaseModel {
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

  @HasMany(() => CategoryImage)
  categoryImages: CategoryImage[];
}
