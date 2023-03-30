export interface ICreateBranchServicesInput {
  branchId?: number;
  merchantId?: number;
  serviceGroupId?: number;
  price?: number;
  capitalPrice?: number;
  durationHour?: number;
  durationMinute?: number;
  name?: string;
  code?: string;
  description?: string;
  canEditPriceInPay?: boolean;
  image?: string;
  showType?: number;
  status?: number;
  canPrintHouseInInvoice?: boolean;
}

export interface IUpdateBranchServicesInput {
  id: number;
  data: Partial<ICreateBranchServicesInput>;
}
