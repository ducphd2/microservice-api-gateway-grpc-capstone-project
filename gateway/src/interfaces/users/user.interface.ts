import { EUserGender, EUserRole, EUserStatus } from '../../enums';
import { InputRegisterRequest } from '../../modules/user/dtos/inputRegisterRequest.dto';
import { IErrorPayload } from '../commons.interface';

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

export interface IPageInfo {
  startCursor?: string;
  endCursor?: string;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
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
