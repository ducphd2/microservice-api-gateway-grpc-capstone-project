import { makePaginate } from 'sequelize-cursor-pagination';
import { Column, DataType, Index, Model, Table } from 'sequelize-typescript';

@Table({
  modelName: 'customer',
  tableName: 'customers',
})
export class Customer extends Model<Customer> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the customer record.',
  })
  id: number;

  @Index('customer_name')
  @Column({
    type: DataType.TEXT,
    comment: "The user's name.",
  })
  name: string;

  @Index('customer_email')
  @Column({
    type: DataType.TEXT,
    comment: "The user's email.",
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    comment: "The user's password.",
  })
  password: string;

  @Column({
    type: DataType.INTEGER,
    comment: "The user's age.",
  })
  age: number;

  @Column({
    type: DataType.INTEGER,
    comment: 'The phone number.',
  })
  phone: number;

  public static cursorPaginate = makePaginate<Customer>(Customer, {
    primaryKeyField: 'id',
  });
}
