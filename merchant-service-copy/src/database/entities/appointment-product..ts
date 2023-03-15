import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table({
  tableName: 'appointment_products',
  underscored: true,
})
export class AppointmentProduct extends BaseModel {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  appointmentId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  price: number;
}
