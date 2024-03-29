import { IModelConnection, IModelEdge, IPageInfo } from '../commons.interface';

export interface IMerchantBranch {
  id?: number;
  name?: string;
  phone?: string;
  address?: string;
  cityCode?: number;
  districtCode?: number;
  wardCode?: number;
  userId?: number;
  merchantId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IMerchantBranchConnection extends IModelConnection<IMerchantBranch> {
  edges: IModelEdge<IMerchantBranch>[];
  pageInfo: IPageInfo;
}
