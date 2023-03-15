import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table({
  tableName: 'appointments',
  underscored: true,
})
export class Appointment extends BaseModel {
  @Column({
    type: DataType.ENUM('pending', 'approve', 'cancelled'),
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  branchServiceId: number;

  @Column({
    type: DataType.INTEGER,
  })
  startTime: number;

  @Column({
    type: DataType.INTEGER,
  })
  endTime: number;

  @Column({
    type: DataType.INTEGER,
  })
  durationMinute: number;
}
