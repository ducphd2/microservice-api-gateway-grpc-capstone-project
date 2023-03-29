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

export interface ICreateServiceInput {
  serviceGroupId: number;
  price: number;
  capitalPrice: number;
  durationHour: number;
  durationMinute: number;
  canEditPriceInPay?: boolean;
  status: number;
  canPrintHouseInInvoice: boolean;
  name?: string;
  code?: string;
  description?: string;
  image?: string;
  showType?: number;
  branchIds?: number[];
  merchantId?: number;
}

export interface IUpdateServiceInput {
  id: number;
  data: Partial<ICreateServiceInput>;
}
