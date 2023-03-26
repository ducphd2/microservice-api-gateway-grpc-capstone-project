import { Booking } from '../../../database/models';
import { Attributes } from 'sequelize';

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
  startTime: string;
  endTime: string;
  duration: number;
}
