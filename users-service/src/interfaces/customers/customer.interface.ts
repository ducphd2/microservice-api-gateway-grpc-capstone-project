import { FindOptions } from 'sequelize';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../commons/find-and-paginate.interface';
import { IUser } from '../users';

export interface ICustomer extends IUser {
  referrer?: string;
  referrerCode?: string;
  userId?: number;
  level?: string;
  branchId?: number;
  customerCode?: string;
  facebook?: string;
  zaloPhone?: string;
  height?: number;
  weight?: number;
  memberCardNo?: string;
  address?: string;
  cityCode?: number;
  districtCode?: number;
  company?: string;
  taxNo?: string;
  note?: string;
  relatedUser?: string;
  relatedUserRole?: string;
  relatedUserPhone?: string;
}

export interface ICreateCustomer {
  fullName?: string;
  email?: string;
  password?: string;
  contact?: string;
  address?: string;
  cityCode?: number;
  districtCode?: number;
  gender?: string;
  dobDay?: number;
  dobMonth?: number;
  dobYear?: number;
  occupation?: string;
  avatar?: string;

  level?: string;
  branchId?: number;
  referrer?: string;
  referrerCode?: string;
  customerCode?: string;

  facebook?: string;
  zaloPhone?: string;
  height?: number;
  weight?: number;
  memberCardNo?: string;
  company?: string;
  taxNo?: string;
  note?: string;
  relatedUser?: string;
  relatedUserRole?: string;
  relatedUserPhone?: string;
}

export type IUpdateCustomer = Partial<ICreateCustomer>;

export interface ICustomersService {
  find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<ICustomer>>;
  findById(id: number): Promise<ICustomer>;
  findOne(query?: FindOptions): Promise<ICustomer>;
  count(query?: FindOptions): Promise<number>;
  create(customer: ICreateCustomer): Promise<ICustomer>;
  update(id: number, data: IUpdateCustomer): Promise<ICustomer>;
  destroy(query?: FindOptions): Promise<number>;
}
