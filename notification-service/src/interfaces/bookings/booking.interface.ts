export interface IBooking {
  id?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  customerId?: number;
  branchServiceId?: number;
  startTime?: string;
  endTime?: string;
  duration?: number;
  branchAdminEmail?: string;
  customerEmail?: string;
  customerName?: string;
}
