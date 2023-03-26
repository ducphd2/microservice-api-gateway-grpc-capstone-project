import { Attributes, FindOptions } from 'sequelize';

import { Booking } from '../../database/models';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../interfaces';

export interface IBookingsService {
  find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<Booking>>;
  findById(id: number): Promise<Booking>;
  findOne(query?: FindOptions): Promise<Booking>;
  count(query?: FindOptions): Promise<number>;
  create(booking: Attributes<Booking>): Promise<Booking>;
  update(id: number, booking: Attributes<Booking>): Promise<Booking>;
  destroy(query?: FindOptions): Promise<number>;
}
