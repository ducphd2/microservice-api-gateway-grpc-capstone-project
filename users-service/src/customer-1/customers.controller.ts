import Aigle from 'aigle';

import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { isEmpty, isNil } from 'lodash';
import { PinoLogger } from 'nestjs-pino';

import { ICount, IQuery } from '../commons/commons.interface';
import { IFindPayload } from '../commons/cursor-pagination.interface';
import { ICustomersService } from './customers.interface';

import { CustomerDto } from './customers.dto';
import { Customer } from './customers.model';

const { map } = Aigle;

@Controller()
export class UsersController {
  constructor(
    @Inject('CustomersService') private readonly service: ICustomersService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(UsersController.name);
  }

  @GrpcMethod('CustomersService', 'find')
  async find(query: IQuery): Promise<IFindPayload<Customer>> {
    this.logger.info('UsersController#findAll.call %o', query);

    const { results, cursors } = await this.service.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<Customer> = {
      edges: await map(results, async (comment: Customer) => ({
        node: comment,
        cursor: Buffer.from(JSON.stringify([comment.id])).toString('base64'),
      })),
      pageInfo: {
        startCursor: cursors.before || '',
        endCursor: cursors.after || '',
        hasNextPage: cursors.hasNext || false,
        hasPreviousPage: cursors.hasPrevious || false,
      },
    };

    this.logger.info('UsersController#findAll.result %o', result);

    return result;
  }

  @GrpcMethod('CustomersService', 'findById')
  async findById({ id }): Promise<Customer> {
    this.logger.info('UsersController#findById.call %o', id);

    const result: Customer = await this.service.findById(id);

    this.logger.info('UsersController#findById.result %o', result);

    if (isEmpty(result)) throw new Error('Record not found.');

    return result;
  }

  @GrpcMethod('CustomersService', 'findOne')
  async findOne(query: IQuery): Promise<Customer> {
    this.logger.info('UsersController#findOne.call %o', query);

    const result: Customer = await this.service.findOne({
      attributes: !isEmpty(query.select) ? query.select : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    this.logger.info('UsersController#findOne.result %o', result);

    if (isEmpty(result)) throw new Error('Record not found.');

    return result;
  }

  @GrpcMethod('CustomersService', 'count')
  async count(query: IQuery): Promise<ICount> {
    this.logger.info('UsersController#count.call %o', query);

    const count: number = await this.service.count({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    this.logger.info('UsersController#count.result %o', count);

    return { count };
  }

  @GrpcMethod('CustomersService', 'create')
  async create(data: CustomerDto): Promise<Customer> {
    this.logger.info('UsersController#create.call %o', data);

    const result: Customer = await this.service.create(data);

    this.logger.info('UsersController#create.result %o', result);

    return result;
  }

  @GrpcMethod('CustomersService', 'update')
  async update({ id, data }): Promise<Customer> {
    this.logger.info('UsersController#update.call %o %o', id, data);

    const result: Customer = await this.service.update(id, data);

    this.logger.info('UsersController#update.result %o', result);

    return result;
  }

  @GrpcMethod('CustomersService', 'destroy')
  async destroy(query: IQuery): Promise<ICount> {
    this.logger.info('UsersController#destroy.call %o', query);

    const count: number = await this.service.destroy({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    this.logger.info('UsersController#destroy.result %o', count);

    return { count };
  }
}
