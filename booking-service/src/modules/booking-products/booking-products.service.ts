import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isEmpty } from 'lodash';
import { FindOptions, Transaction } from 'sequelize';

import { IBookingProductsService } from '../../interfaces/booking-products/booking-products-grpc.interface';

import { Sequelize } from 'sequelize-typescript';
import { BookingProduct } from '../../database/models';
import { IBookingProductDto } from './dto';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../interfaces';

@Injectable()
export class BookingProductsService implements IBookingProductsService {
  constructor(
    @InjectModel(BookingProduct) private readonly repo: typeof BookingProduct,
    private readonly sequelize: Sequelize,
  ) {}

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<BookingProduct>> {
    // @ts-ignore
    const result: IFindAndPaginateResult<BookingProduct> = await this.repo.findAndPaginate({
      ...query,
      raw: true,
      paranoid: false,
    });

    return result;
  }

  async findById(id: number): Promise<BookingProduct> {
    const result: BookingProduct = await this.repo.findByPk(id, {
      raw: true,
    });

    return result;
  }

  async findOne(query: FindOptions): Promise<BookingProduct> {
    const result: BookingProduct = await this.repo.findOne({
      ...query,
      raw: true,
    });

    return result;
  }

  async count(query?: FindOptions): Promise<number> {
    const result: number = await this.repo.count(query);

    return result;
  }

  async create(bookingInput: IBookingProductDto, transaction?: Transaction): Promise<BookingProduct> {
    const booking: BookingProduct = await this.repo.create(bookingInput, { transaction });

    return booking;
  }

  async update(id: number, booking: IBookingProductDto, transaction?: Transaction): Promise<BookingProduct> {
    const record: BookingProduct = await this.repo.findByPk(id);

    if (isEmpty(record)) throw new Error('Record not found.');

    const [affectedCount, affectedRows] = await this.repo.update(booking, {
      where: { id },
      returning: true,
      transaction,
    });

    return affectedRows[0];
  }

  async destroy(query?: FindOptions): Promise<number> {
    const result: number = await this.repo.destroy(query);

    return result;
  }
}
