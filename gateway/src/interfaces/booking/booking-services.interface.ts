import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';
import { Booking, BookingPaginationResponse, CreateBookingInput, UpdateBookingInput } from '../../types';
import { ICount, IId, IQuery, IQueryV2 } from '../commons.interface';
import { IBookingsConnection, ICustomerCreateBookingInput } from './booking.interface';

export interface IBookingServiceGrpc {
  find(query: IQuery, metadata?: Metadata): Observable<IBookingsConnection>;
  findAll(query: IQueryV2, metadata?: Metadata): Observable<BookingPaginationResponse>;
  findById(id: IId, metadata?: Metadata): Observable<Booking>;
  findOne(query: IQuery, metadata?: Metadata): Observable<Booking>;
  update(data: UpdateBookingInput): Observable<Booking>;
  create(data: CreateBookingInput): Observable<Booking>;
  customerCreate(data: ICustomerCreateBookingInput): Observable<Booking>;
  count(query: IQuery, metadata?: Metadata): Observable<ICount>;
  destroy(query: IQueryV2, metadata?: Metadata): Observable<ICount>;
}
