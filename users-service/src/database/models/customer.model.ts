import { Column, DataType, Table } from 'sequelize-typescript';
import { EUserGender, EUserRole, EUserStatus } from '../../enums/user.enum';
import { BaseModel } from './base.model';
import { PaginateOptions, PaginationConnection, makePaginate } from 'sequelize-cursor-pagination';

@Table({
  modelName: 'customer',
  tableName: 'customers',
  underscored: true,
})
export class Customer extends BaseModel<Customer> {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.ENUM(EUserStatus.ACTIVE, EUserStatus.BANNED),
    allowNull: false,
    defaultValue: EUserStatus.ACTIVE,
  })
  status: string;

  @Column({
    type: DataType.ENUM(EUserRole.USER, EUserRole.ADMIN, EUserRole.SUPER_ADMIN),
    allowNull: false,
    defaultValue: EUserRole.USER,
  })
  role: string;

  @Column({
    type: DataType.ENUM(EUserGender.FEMALE, EUserGender.MALE, EUserGender.OTHER),
    allowNull: false,
  })
  gender: string;

  @Column({
    type: DataType.TEXT,
  })
  occupation: string;

  @Column({
    type: DataType.TEXT,
  })
  avatar: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  contact: string;

  @Column({
    type: DataType.INTEGER,
  })
  dobDay: number;

  @Column({
    type: DataType.INTEGER,
  })
  dobMonth: number;

  @Column({
    type: DataType.INTEGER,
  })
  dobYear: number;

  public static makePagination() {
    return makePaginate<Customer>(Customer, {
      primaryKeyField: 'id',
    });
  }

  declare static paginate: (options: PaginateOptions<Customer>) => Promise<PaginationConnection<Customer>>;
}
