import Aigle from 'aigle';

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { isEmpty, isNil } from 'lodash';

import { EGrpcClientService } from '../../enums';
import { ErrorHelper } from '../../helpers';
import { IBooking, ICount, IFindPayload, IId, IQuery } from '../../interfaces';
import { BookingProductsService } from './booking-products.service';
import { IBookingProductDto } from './dto';
import { BOOKING_MESSAGE } from '../../constants';
import { BookingProduct } from '../../database/models';

const { map } = Aigle;

@Controller()
export class BookingProductsController {
  constructor(private readonly service: BookingProductsService) {}

  @GrpcMethod(EGrpcClientService.USER_SERVICE, 'create')
  async create(data: IBookingProductDto): Promise<IBooking> {
    const result: IBooking = await this.service.create(data);

    return result;
  }

  @GrpcMethod(EGrpcClientService.USER_SERVICE, 'find')
  async find(query: IQuery): Promise<IFindPayload<BookingProduct>> {
    const { results, cursors } = await this.service.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<BookingProduct> = {
      edges: await map(results, async (user: BookingProduct) => ({
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

  @GrpcMethod(EGrpcClientService.USER_SERVICE, 'findById')
  async findById({ id }: IId): Promise<BookingProduct> {
    const result: BookingProduct = await this.service.findById(id);

    if (isEmpty(result)) throw new Error('Record not found.');

    return result;
  }

  @GrpcMethod(EGrpcClientService.USER_SERVICE, 'findOne')
  async findOne(query: IQuery): Promise<BookingProduct> {
    const result: BookingProduct = await this.service.findOne({
      attributes: !isEmpty(query.select) ? query.select : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    if (isEmpty(result)) ErrorHelper.NotFoundException(BOOKING_MESSAGE.BOOKING_NOT_FOUND);

    return result;
  }

  @GrpcMethod(EGrpcClientService.USER_SERVICE, 'count')
  async count(query: IQuery): Promise<ICount> {
    const count: number = await this.service.count({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    return { count };
  }

  @GrpcMethod(EGrpcClientService.USER_SERVICE, 'update')
  async update({ id, data }): Promise<BookingProduct> {
    const result: BookingProduct = await this.service.update(id, data);

    return result;
  }

  @GrpcMethod(EGrpcClientService.USER_SERVICE, 'destroy')
  async destroy(query: IQuery): Promise<ICount> {
    const count: number = await this.service.destroy({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    return { count };
  }
}
