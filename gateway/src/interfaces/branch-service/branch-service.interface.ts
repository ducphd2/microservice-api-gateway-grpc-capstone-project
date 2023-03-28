import { IModelEdge, IPageInfo } from '../commons.interface';

export interface IBranchService {
  id?: number;
  serviceGroupId?: number;
  price?: number;
  capitalPrice?: number;
  durationHour?: number;
  durationMinute?: number;
  name?: string;
  code?: string;
  description?: string;
  image?: string;
  showType?: number;
  status?: number;
  canPrintableInvoice?: number;
  createdAt?: string;
  updatedAt?: string;
  options?: Record<string, any> | any;
}

export interface IBranchServiceConnection {
  edges: IModelEdge<IBranchService>[];
  pageInfo: IPageInfo;
}

export interface ICreateBranchServiceInput {
  name?: string;
  code?: string;
  description?: string;
  image?: string;
  showType?: number;
  branchId?: number;
}

export interface IUpdateBranchServiceInput {
  id: number;
  data: Partial<ICreateBranchServiceInput>;
}
