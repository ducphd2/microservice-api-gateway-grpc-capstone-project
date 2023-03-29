import { FindOptions } from 'sequelize';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../commons/find-and-paginate.interface';
import { IUser } from '../users';

export interface ICustomerInput {
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
  referrer?: string;
  referrerCode?: string;
}

export interface ICustomer extends ICustomerInput {
  id?: number;
  fullName?: string;
  email?: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  dobDay?: number;
  dobMonth?: number;
  dobYear?: number;
  occupation?: string;
  avatar?: string;
  status?: string;
  role?: string;
  gender?: string;
  contact?: string;
  userId?: number;
}

export interface ICreateCustomer {
  userInput: IUser;
  customerInput: ICustomerInput;
}

export interface IUpdateCustomer {
  userInput: Partial<IUser>;
  customerInput: Partial<ICustomerInput>;
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

export interface IRegisterCustomer {
  email: string;
  password: string;
}

export interface IRegisterCustomerResponse {
  customer: ICustomer;
  user: IUser;
}
