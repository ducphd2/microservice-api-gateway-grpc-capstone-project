export interface CreateBranchServiceInput {
  branchId: number;
  serviceId: number;
}

export interface UpdateBranchServiceInput {
  id: number;
  data: Partial<CreateBranchServiceInput>;
}
