import { ICustomer } from '../customer-grpc';

export interface IUser {
  email?: string;
  password?: string;
  fullName?: string;
  status?: string;
  role?: string;
  gender?: string;
  contact?: string;
  dobDay?: number;
  dobMonth?: number;
  dobYear?: number;
  occupation?: string;
  avatar?: string;
  id?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICustomerAndUserResponse {
  user: IUser;
  customer: ICustomer;
}
