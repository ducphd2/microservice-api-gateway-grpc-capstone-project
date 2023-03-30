import * as paginate from 'sequelize-cursor-pagination';
import { Column, DataType, Table } from 'sequelize-typescript';

import { EBookingStatus } from '../../enums';

import { BaseModel } from './base.model';

@Table({
  modelName: 'booking',
  tableName: 'bookings',
  underscored: true,
})
export class Booking extends BaseModel<Booking> {
  @Column({
    type: DataType.ENUM(EBookingStatus.PENDING, EBookingStatus.CANCELLED, EBookingStatus.APPROVE),
    allowNull: false,
    defaultValue: EBookingStatus.PENDING,
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
  merchantId: number;

  @Column({
    type: DataType.INTEGER,
  })
  branchId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  startTime: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  endTime: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  bookingDate: string;

  @Column({
    type: DataType.TEXT,
  })
  note: string;

  @Column({
    type: DataType.TEXT,
  })
  cancelReason: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  isCustomerCancel: boolean;
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id',
})(Booking);
