import { FindOptions } from 'sequelize';

import { IBookingProductDto } from '../../modules/booking-products/dto';
import { BookingProduct } from '../../database/models';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../common';

export interface IBookingProductsService {
  find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<BookingProduct>>;
  findById(id: number): Promise<BookingProduct>;
  findOne(query?: FindOptions): Promise<BookingProduct>;
  count(query?: FindOptions): Promise<number>;
  create(booking: IBookingProductDto): Promise<BookingProduct>;
  update(id: number, booking: IBookingProductDto): Promise<BookingProduct>;
  destroy(query?: FindOptions): Promise<number>;
}
