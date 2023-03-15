export interface CreateBranchServicesInput {
  name: string;
  code: string;
  price: number;
  durationMinute: number;
  branchId: number;
}

export interface UpdateBranchServicesInput {
  id: number;
  data: Partial<CreateBranchServicesInput>;
}
