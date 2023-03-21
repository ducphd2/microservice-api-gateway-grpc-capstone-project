import { Column, DataType, Model } from 'sequelize-typescript';

export abstract class BaseModel<T> extends Model<T> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    defaultValue: () => `${new Date().toISOString()}`,
    allowNull: false,
  })
  createdAt: string;

  @Column({
    type: DataType.TEXT,
    defaultValue: () => `${new Date().toISOString()}`,
    allowNull: false,
  })
  updatedAt: string;
}
