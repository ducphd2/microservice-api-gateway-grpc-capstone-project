import { EUserGender, EUserRole, EUserStatus } from '../../enums';
import { InputRegisterRequest } from '../../modules/user/dtos/inputRegisterRequest.dto';
import { IErrorPayload, IPageInfo } from '../commons.interface';
import { ICustomerInput } from '../customer';

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

export interface IUserEdge {
  node: IUser;
  cursor: string;
}

export interface IUsersConnection {
  edges: IUserEdge[];
  pageInfo: IPageInfo;
}

export interface IUserPayload {
  errors?: IErrorPayload[];
  user?: IUser;
}

export class UpdateDataRequest {
  id: number;
  data: Partial<InputRegisterRequest>;
}

export interface IUserIncludeCustomer extends ICustomerInput {
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
  customerId?: number;
  userId?: number;
}
