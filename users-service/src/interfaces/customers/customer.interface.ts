import { FindOptions, Transaction } from 'sequelize';
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
  userInput: IUser;
  customerInput: ICustomer;
}

export interface IUpdateCustomer {
  userInput: Partial<IUser>;
  customerInput: Partial<ICustomer>;
}

export interface IUpdateCustomerInput {
  id: number;
  data: IUpdateCustomer;
}

export interface ICustomersService {
  find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<ICustomer>>;
  findById(id: number): Promise<ICustomer>;
  findOne(query?: FindOptions): Promise<ICustomer>;
  count(query?: FindOptions): Promise<number>;
  create(customer: ICreateCustomer): Promise<ICustomer>;
  update(id: number, data: IUpdateCustomer): Promise<ICustomer>;
  destroy(query?: FindOptions): Promise<number>;
}
