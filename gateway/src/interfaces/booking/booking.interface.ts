import { PartialUpdateBooking } from '../../types';
import { IErrorPayload, IPageInfo } from '../commons.interface';

export interface IBooking {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  customerId?: number;
  branchServiceId?: number;
  startTime?: string;
  endTime?: string;
  duration?: number;
}

export interface IBookingEdge {
  node: IBooking;
  cursor: string;
}

export interface IBookingsConnection {
  edges: IBookingEdge[];
  pageInfo: IPageInfo;
}

export interface IBookingPayload {
  errors?: IErrorPayload[];
  user?: IBooking;
}

export interface IUpdateBookingInput {
  id: number;
  data: PartialUpdateBooking;
}

export interface ICustomerCreateBookingInput {
  status?: string;
  customerId?: number;
  branchServiceId?: number;
  startTime?: string;
  endTime?: string;
  duration?: number;
  adminBranchEmail?: string;
  customerEmail?: string;
  customerName?: string;
  note?: string;
}
