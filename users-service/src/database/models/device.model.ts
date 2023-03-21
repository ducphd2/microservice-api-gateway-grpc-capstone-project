import * as paginate from 'sequelize-cursor-pagination';
import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { User } from './user.model';

@Table({
  modelName: 'device',
  tableName: 'devices',
  underscored: true,
})
export class Device extends BaseModel<Device> {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  os: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  deviceId: string;

  @Column({
    type: DataType.TEXT,
  })
  token: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id',
})(Device);
