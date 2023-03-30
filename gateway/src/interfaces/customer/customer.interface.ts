import { InputRegisterRequest } from '../../modules/user/dtos/inputRegisterRequest.dto';
import { IErrorPayload, IPageInfo } from '../commons.interface';

export interface ICustomer {
  level?: string;
  branchId?: number;
  merchantId?: number;
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
  id?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICustomerEdge {
  node: ICustomer;
  cursor: string;
}

export interface ICustomersConnection {
  edges: ICustomerEdge[];
  pageInfo: IPageInfo;
}

export interface ICustomerPayload {
  errors?: IErrorPayload[];
  customer?: ICustomer;
}

export class UpdateCustomerInput {
  id: number;
  data: Partial<InputRegisterRequest>;
}

export interface ICustomerInput {
  level?: string;
  branchId?: number;
  merchantId?: number;
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
