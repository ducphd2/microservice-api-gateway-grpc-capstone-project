import * as paginate from 'sequelize-cursor-pagination';
import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table({
  modelName: 'booking_product',
  tableName: 'booking_products',
  underscored: true,
})
export class BookingProduct extends BaseModel<BookingProduct> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookingId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id',
})(BookingProduct);
