import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { ICount, IId, IQuery } from '../commons.interface';
import { IBookingsConnection, IUpdateBookingInput } from './booking.interface';
import { Booking, CreateBookingInput, PartialUpdateBooking } from '../../types';

export interface IBookingServiceGrpc {
  find(query: IQuery, metadata?: Metadata): Observable<IBookingsConnection>;
  findById(id: IId, metadata?: Metadata): Observable<Booking>;
  findOne(query: IQuery, metadata?: Metadata): Observable<Booking>;
  update(data: IUpdateBookingInput): Observable<Booking>;
  create(data: CreateBookingInput): Observable<Booking>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
  destroy(query: IQuery, metadata?: Metadata): Observable<ICount>;
}
