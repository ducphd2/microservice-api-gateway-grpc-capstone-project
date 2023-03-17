import { Column, DataType, Model } from 'sequelize-typescript';
import { getCurrentDateInSecond } from '../../helpers';

export abstract class BaseModel extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.BIGINT,
    defaultValue: getCurrentDateInSecond,
    allowNull: false,
  })
  createdAt: number;

  @Column({
    type: DataType.BIGINT,
    defaultValue: getCurrentDateInSecond,
    allowNull: false,
  })
  updatedAt: number;
}
