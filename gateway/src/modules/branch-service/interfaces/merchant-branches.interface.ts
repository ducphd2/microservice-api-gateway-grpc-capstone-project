import { IModelConnection, IModelEdge, IPageInfo } from '../../../interfaces';
import { PartialUpdateBranchServiceGroup } from '../../../types';
import { IErrorPayload } from '../../../types/base.type';

export interface IMerchantBranch {
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
}

export interface IIMerchantBranchPayload {
  errors?: IErrorPayload[];
  user?: IMerchantBranch;
}

export interface IUserConn extends IModelConnection<IMerchantBranch> {
  edges: IModelEdge<IMerchantBranch>[];
  pageInfo: IPageInfo;
}

export interface IUpdateMerchantBranch {
  id: number;
  data: PartialUpdateBranchServiceGroup;
}
