import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Category } from './category.model';

@Table({
  tableName: 'category_images',
  underscored: true,
})
export class CategoryImage extends BaseModel {
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
  @ForeignKey(() => Category)
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
