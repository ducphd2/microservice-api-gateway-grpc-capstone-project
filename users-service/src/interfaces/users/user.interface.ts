import { ICustomer, ICustomerInput } from '../customers';

export interface IUser {
  id?: number;
  fullName?: string;
  email?: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
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
}

export interface IUserIncludeCustomer {
  user: IUser;
  customer: ICustomer;
}
