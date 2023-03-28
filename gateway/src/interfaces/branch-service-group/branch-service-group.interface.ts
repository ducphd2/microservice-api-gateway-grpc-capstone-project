import { IModelEdge, IPageInfo } from '../commons.interface';

export interface IBranchServiceGroup {
  id?: number;
  name?: string;
  code?: string;
  description?: string;
  image?: string;
  showType?: number;
  branchId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBranchServiceGroupConnection {
  edges: IModelEdge<IBranchServiceGroup>[];
  pageInfo: IPageInfo;
}

export interface ICreateBranchServiceGroupInput {
  name?: string;
  code?: string;
  description?: string;
  image?: string;
  showType?: number;
  branchId?: number;
}

export interface IUpdateBranchServiceGroupInput {
  id: number;
  data: Partial<ICreateBranchServiceGroupInput>;
}
