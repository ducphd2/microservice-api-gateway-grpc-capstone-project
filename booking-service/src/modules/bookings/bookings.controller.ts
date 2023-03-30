import Aigle from 'aigle';
import { Controller, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { isEmpty, isNil } from 'lodash';

import { GrpcLogInterceptor } from '../../commons/interceptors';
import { BOOKING_MESSAGE } from '../../constants';
import { Booking } from '../../database/models';
import { EGrpcClientService } from '../../enums';
import { ErrorHelper } from '../../helpers';
import { IBooking, ICount, IFindPayload, IId, IQuery, IQueryV2 } from '../../interfaces';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto';

const { map } = Aigle;

@UseInterceptors(GrpcLogInterceptor)
@Controller()
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @GrpcMethod(EGrpcClientService.BOOKING_SERVICE, 'create')
  async create(data: CreateBookingDto): Promise<IBooking> {
    const result: IBooking = await this.service.create(data);

    return result;
  }

  @GrpcMethod(EGrpcClientService.BOOKING_SERVICE, 'customerCreate')
  async customerCreate(data: CreateBookingDto): Promise<IBooking> {
    const result: IBooking = await this.service.create(data);

    return result;
  }

  @GrpcMethod(EGrpcClientService.BOOKING_SERVICE, 'find')
  async find(query: IQuery): Promise<IFindPayload<Booking>> {
    const { results, cursors } = await this.service.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<Booking> = {
      edges: await map(results, async (user: Booking) => ({
        node: user,
        cursor: Buffer.from(JSON.stringify([user.id])).toString('base64'),
      })),
      pageInfo: {
        startCursor: cursors.before || '',
        endCursor: cursors.after || '',
        hasNextPage: cursors.hasNext || false,
        hasPreviousPage: cursors.hasPrevious || false,
      },
    };

    return result;
  }

  @GrpcMethod(EGrpcClientService.BOOKING_SERVICE, 'findById')
  async findById({ id }: IId): Promise<Booking> {
    const result: Booking = await this.service.findById(id);

    if (isEmpty(result)) throw new Error('Record not found.');

    return result;
  }

  @GrpcMethod(EGrpcClientService.BOOKING_SERVICE, 'findOne')
  async findOne(query: IQuery): Promise<Booking> {
    const result: Booking = await this.service.findOne({
      attributes: !isEmpty(query.select) ? query.select : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    if (isEmpty(result)) ErrorHelper.NotFoundException(BOOKING_MESSAGE.BOOKING_NOT_FOUND);

    return result;
  }

  @GrpcMethod(EGrpcClientService.BOOKING_SERVICE, 'count')
  async count(query: IQuery): Promise<ICount> {
    const count: number = await this.service.count({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    return { count };
  }

  @GrpcMethod(EGrpcClientService.BOOKING_SERVICE, 'update')
  async update({ id, data }): Promise<Booking> {
    const result: Booking = await this.service.update(id, data);

    return result;
  }

  @GrpcMethod(EGrpcClientService.BOOKING_SERVICE, 'destroy')
  async destroy(query: IQuery): Promise<ICount> {
    const count: number = await this.service.destroy({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    return { count };
  }

  @GrpcMethod(EGrpcClientService.BOOKING_SERVICE, 'findAll')
  async findAll(query: IQueryV2) {
    return this.service.findAll(query);
  }
}
