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
}

export interface IBookingResToGraphQl extends IBooking {
  customerEmail?: string;
  customerName?: string;
  customerAddress?: string;
}
