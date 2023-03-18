import Aigle from 'aigle';

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { isEmpty, isNil } from 'lodash';
import { PinoLogger } from 'nestjs-pino';

import { ICount, IQuery } from '../commons/commons.interface';
import { IFindPayload } from '../commons/cursor-pagination.interface';

import { Customer } from '../database/models/customer.model';
import { EGrpcClientService, EUserRole } from '../enums';
import { ICustomer } from '../interfaces/customers';
import { CustomersService } from './customers.service';

const { map } = Aigle;

@Controller()
export class CustomersController {
  constructor(private readonly service: CustomersService, private readonly logger: PinoLogger) {
    logger.setContext(CustomersController.name);
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'find')
  async find(query: IQuery): Promise<IFindPayload<Customer>> {
    this.logger.info('CustomersController#findAll.call %o', query);

    const { results, cursors } = await this.service.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<Customer> = {
      edges: await map(results, async (customer: Customer) => ({
        node: customer,
        cursor: Buffer.from(JSON.stringify([customer.id])).toString('base64'),
      })),
      pageInfo: {
        startCursor: cursors.before || '',
        endCursor: cursors.after || '',
        hasNextPage: cursors.hasNext || false,
        hasPreviousPage: cursors.hasPrevious || false,
      },
    };

    this.logger.info('CustomersController#findAll.result %o', result);

    return result;
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'findById')
  async findById({ id }): Promise<Customer> {
    this.logger.info('CustomersController#findById.call %o', id);

    const result: Customer = await this.service.findById(id);

    this.logger.info('CustomersController#findById.result %o', result);

    if (isEmpty(result)) throw new Error('Record not found.');

    return result;
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'findOne')
  async findOne(query: IQuery): Promise<Customer> {
    this.logger.info('CustomersController#findOne.call %o', query);

    const result: Customer = await this.service.findOne({
      attributes: !isEmpty(query.select) ? query.select : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    this.logger.info('CustomersController#findOne.result %o', result);

    if (isEmpty(result)) throw new Error('Record not found.');

    return result;
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'count')
  async count(query: IQuery): Promise<ICount> {
    this.logger.info('CustomersController#count.call %o', query);

    const count: number = await this.service.count({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    this.logger.info('CustomersController#count.result %o', count);

    return { count };
  }

  // @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'create')
  async create(data: ICustomer): Promise<Customer> {
    this.logger.info('CustomersController#create.call %o', data);

    const result: Customer = await this.service.create({ ...data, role: EUserRole.USER });

    this.logger.info('CustomersController#create.result %o', result);

    return result;
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'update')
  async update({ id, data }): Promise<Customer> {
    this.logger.info('CustomersController#update.call %o %o', id, data);

    const result: Customer = await this.service.update(id, data);

    this.logger.info('CustomersController#update.result %o', result);

    return result;
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'destroy')
  async destroy(query: IQuery): Promise<ICount> {
    this.logger.info('CustomersController#destroy.call %o', query);

    const count: number = await this.service.destroy({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    this.logger.info('CustomersController#destroy.result %o', count);

    return { count };
  }
}
