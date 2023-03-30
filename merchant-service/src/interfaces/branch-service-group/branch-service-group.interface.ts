export interface ICreateBranchServiceGroupInput {
  branchId?: number;
  name?: string;
  code?: string;
  description?: string;
  image?: string;
  showType?: number;
  merchantId?: number;
}

export interface IUpdateBranchServiceGroupInput {
  id: number;
  data: Partial<ICreateBranchServiceGroupInput>;
}
