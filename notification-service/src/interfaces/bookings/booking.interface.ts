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
  adminBranchEmail?: string;
  customerEmail?: string;
  customerName?: string;
  bookingDate?: string;
  customerPhoneNumber?: string;
  isAdminUpdate?: boolean;
  isCustomerCancel?: boolean;
  cancelReason?: string;
  adminUpdateId?: number;
  branchId?: number;
  merchantId?: number;
}
