import { hash } from 'argon2';
import * as paginate from 'sequelize-cursor-pagination';
import { BeforeCreate, BeforeUpdate, Column, DataType, HasMany, HasOne, Table } from 'sequelize-typescript';
import { EUserGender, EUserRole, EUserStatus } from '../../enums/user.enum';
import { BaseModel } from './base.model';
import { Device } from './device.model';
import { Customer } from './customer.model';

@Table({
  modelName: 'user',
  tableName: 'users',
  underscored: true,
})
export class User extends BaseModel<User> {
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

  @Column({
    type: DataType.TEXT,
  })
  address: string;

  @Column({
    type: DataType.INTEGER,
  })
  cityCode: number;

  @Column({
    type: DataType.INTEGER,
  })
  districtCode: number;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: User) {
    if (!user.password) return;
    user.password = await hash(user.password);
  }

  @HasOne(() => Customer, { foreignKey: 'userId' })
  customer: Customer;

  @HasMany(() => Device)
  devices: Device[];
}

paginate({
  methodName: 'findAndPaginate',
  primaryKeyField: 'id',
})(User);
