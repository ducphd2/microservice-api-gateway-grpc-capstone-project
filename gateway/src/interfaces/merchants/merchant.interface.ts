import { Merchant, MerchantBranch } from '../../types';
import { IModelConnection, IModelEdge, IPageInfo } from '../commons.interface';
import { IMerchantBranch } from '../merchants-branch';

export interface IRegisterResponse {
  merchant: Merchant;
  branch: MerchantBranch;
}

export interface IRegisterInput {
  name: string;
  phone: string;
  address: string;
  userId: number;
  cityCode: number;
  districtCode: number;
  wardCode: number;
}

export interface IMerchant {
  id?: number;
  name?: string;
  phone?: string;
  address?: string;
  cityCode?: number;
  districtCode?: number;
  wardCode?: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
  branches: IMerchantBranch[];
}

export interface IMerchantConnection extends IModelConnection<IMerchant> {
  edges: IModelEdge<IMerchant>[];
  pageInfo: IPageInfo;
}
