import { FindOptions } from 'sequelize';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../commons/find-and-paginate.interface';
import { IUser } from '../users';

export interface ICustomer extends IUser {
  id?: number;
  fullName?: string;
  email?: string;
  password?: string;
  createdAt?: number;
  updatedAt?: number;
  version?: number;
  dobDay?: number;
  dobMonth?: number;
  dobYear?: number;
  occupation?: string;
  avatar?: string;
  status?: string;
  role?: string;
  gender?: string;
  contact?: string;
  referrer?: string;
  referrerCode?: string;
  userId?: number;
  level?: string;
  branchId?: number;
}

export interface ICreateCustomer {
  user: IUser;
  customer: ICustomer;
}

export interface ICustomersService {
  find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<ICustomer>>;
  findById(id: number): Promise<ICustomer>;
  findOne(query?: FindOptions): Promise<ICustomer>;
  count(query?: FindOptions): Promise<number>;
  create(customer: ICustomer): Promise<ICustomer>;
  update(id: number, comment: ICustomer): Promise<ICustomer>;
  destroy(query?: FindOptions): Promise<number>;
}
