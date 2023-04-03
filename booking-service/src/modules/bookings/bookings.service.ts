import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { Attributes, FindOptions, Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { Booking } from '../../database/models';
import { EBookingStatus, EBullEvent } from '../../enums';
import {
  IBookingResToGraphQl,
  IFindAndPaginateOptions,
  IFindAndPaginateResult,
  IPaginationRes,
  IQueryV2,
} from '../../interfaces';
import { UserGrpcService } from '../user-grpc/user-grpc.service';

import { IBookingsService } from './bookings.interface';
import { BookingsRepository } from './bookings.repository';
import { BookingQueueProvider } from './bull-producer.service';

@Injectable()
export class BookingsService implements IBookingsService {
  constructor(
    private bookingsRepository: BookingsRepository,
    private readonly sequelize: Sequelize,
    private bookingQueue: BookingQueueProvider,
    private readonly userGrpcService: UserGrpcService,
  ) {}

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<Booking>> {
    // @ts-ignore
    const result: IFindAndPaginateResult<Booking> = await this.bookingsRepository.findAndPaginate(
      {
        ...query,
      },
      {
        raw: true,
        paranoid: false,
      },
    );

    return result;
  }

  async findById(id: number): Promise<Booking> {
    const result: Booking = await this.bookingsRepository.findById(id, {
      raw: true,
    });

    return result;
  }

  async findOne(query: FindOptions): Promise<Booking> {
    const result: Booking = await this.bookingsRepository.findOne({
      ...query,
      raw: true,
    });

    return result;
  }

  async count(query?: FindOptions): Promise<number> {
    const result: number = await this.bookingsRepository.count(query);

    return result;
  }

  async create(userInput: Attributes<Booking>, transaction?: Transaction): Promise<Booking> {
    const booking: Booking = await this.bookingsRepository.create(userInput, { transaction });
    // push event to booking queue
    await this.bookingQueue.addBookingEvent(EBullEvent.BOOKING_NOTIFICATION_EVENT, { ...userInput, ...booking });

    return booking;
  }

  async update(id: number, bookingInput: Attributes<Booking>, transaction?: Transaction): Promise<Booking> {
    const record: Booking = await this.bookingsRepository.findById(id);

    if (isEmpty(record)) throw new Error('Record not found.');

    const bookings = await this.bookingsRepository.update(bookingInput, {
      where: { id },
      transaction,
    });

    if (bookingInput.status === EBookingStatus.APPROVE && bookingInput.isAdminUpdate === true) {
      await this.bookingQueue.addBookingEvent(EBullEvent.APPROVE_BOOKING_NOTIFICATION_EVENT, {
        ...bookingInput,
        ...bookings[0],
      });
    }

    return bookings[0];
  }

  async destroy(query?: FindOptions): Promise<number> {
    const result: number = await this.bookingsRepository.delete(query);

    return result;
  }

  async findAll(query: IQueryV2): Promise<IPaginationRes<IBookingResToGraphQl>> {
    const result = await this.bookingsRepository.findAll(
      {
        ...query,
        where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      },
      {
        order: [[query.orderBy, query.orderDirection]],
      },
    );

    const customerIds = result.items.reduce((acc, curr) => {
      if (!acc.includes(curr.customerId)) {
        acc.push(curr.customerId);
      }
      return acc;
    }, [] as number[]);

    const { items } = await this.userGrpcService.bookingFindCustomerAndUserDetailByCustomerId({
      where: JSON.stringify({
        id: customerIds,
      }),
    });

    const a = result.items.map((booking) => {
      const customer = items.find((c) => c.id === booking.customerId);
      return {
        ...booking,
        customerName: customer.user.fullName,
        customerEmail: customer.user.email,
      };
    });

    return {
      ...result,
      items: a,
    };
  }
}
