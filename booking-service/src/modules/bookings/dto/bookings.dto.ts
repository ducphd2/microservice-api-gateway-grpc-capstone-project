import { Attributes } from 'sequelize';

import { Booking } from '../../../database/models';

export interface IBookingDto {
  id?: number;
  status?: string;
  customerId?: number;
  branchServiceId?: number;
  startTime?: number;
  endTime?: number;
  duration?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBookingDto extends Attributes<Booking> {
  status: string;
  customerId: number;
  branchServiceId: number;
  merchantId: number;
  startTime: string;
  endTime: string;
  duration: number;
  adminBranchEmail: string;
  customerEmail: string;
  customerName: string;
  note: string;
  serviceName: string;
}
