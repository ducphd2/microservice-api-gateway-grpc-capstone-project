import { PartialUpdateCustomer, TestUserInput } from '../../../types';
import { CustomerDto } from '../dtos';

export interface UpdateCustomerInput {
  id: number;
  data: CustomerDto;
}

export interface ICreateCustomer {
  fullName?: string;
  email?: string;
  password?: string;
  contact?: string;
  branchId?: number;
  dobDay?: number;
  dobMonth?: number;
  dobYear?: number;
  occupation?: string;
  avatar?: string;
  referrer?: string;
  referrerCode?: string;
  level?: string;
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

export interface ICustomer {
  id?: number;
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
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
  branchId?: number;
  referrer?: string;
  referrerCode?: string;
}

export interface IPageInfo {
  startCursor?: string;
  endCursor?: string;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export interface ICustomerEdge {
  node: ICustomer;
  cursor: string;
}

export interface ICustomersConnection {
  edges: ICustomerEdge[];
  pageInfo: IPageInfo;
}

export interface ICreateCustomerInput {
  userInput: TestUserInput;
  customerInput: ICreateCustomer;
}

export interface IPartialUpdateCustomerInput {
  userInput: Partial<TestUserInput>;
  customerInput: Partial<ICreateCustomer>;
}

export interface IUpdateCustomerInput {
  id: number;
  data: IPartialUpdateCustomerInput;
}
