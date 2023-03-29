import Aigle from 'aigle';

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { isEmpty, isNil } from 'lodash';
import { PinoLogger } from 'nestjs-pino';

import { ICount, IQuery } from '../../commons/commons.interface';
import { IFindPayload } from '../../commons/cursor-pagination.interface';

import { Customer } from '../../database/models/customer.model';
import { EGrpcClientService, EUserRole } from '../../enums';
import {
  ICreateCustomer,
  ICustomer,
  IRegisterCustomer,
  IRegisterCustomerResponse,
  IUpdateCustomer,
  IUpdateCustomerInput,
} from '../../interfaces/customers';
import { CustomersService } from './customers.service';
import { User } from '../../database/models';
import { ErrorHelper } from '../../helpers';

const { map } = Aigle;

@Controller()
export class CustomersController {
  constructor(private readonly service: CustomersService, private readonly logger: PinoLogger) {
    logger.setContext(CustomersController.name);
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'find')
  async find(query: IQuery): Promise<IFindPayload<ICustomer>> {
    this.logger.info('CustomersController#findAll.call %o', query);

    const { results, cursors } = await this.service.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<ICustomer> = {
      edges: await map(results, async (customer: Customer) => ({
        node: {
          ...customer.user,
          ...customer,
        },
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
  async findById({ id }): Promise<ICustomer> {
    this.logger.info('CustomersController#findById.call %o', id);

    const result: ICustomer = await this.service.findById(id);

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

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'create')
  async create(data: ICreateCustomer): Promise<ICustomer> {
    try {
      this.logger.info('CustomersController#create.call %o', data);

      const result: ICustomer = await this.service.create({
        userInput: {
          ...data.userInput,
          role: EUserRole.USER,
        },
        customerInput: {
          ...data.customerInput,
        },
      });

      this.logger.info('CustomersController#create.result %o', result);

      return result;
    } catch (error) {
      ErrorHelper.BadRequestException('Can not create customer');
    }
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'register')
  async registerCustomer(data: IRegisterCustomer): Promise<IRegisterCustomerResponse> {
    try {
      this.logger.info('CustomersController#registerCustomer.call %o', data);

      const result: IRegisterCustomerResponse = await this.service.register(data);

      this.logger.info('CustomersController#registerCustomer.result %o', result);

      return result;
    } catch (error) {
      console.log(error);
      ErrorHelper.BadRequestException('Can not register customer');
    }
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'update')
  async update({ data, id }: IUpdateCustomerInput): Promise<ICustomer> {
    this.logger.info('CustomersController#update.call %o %o', id, data);

    const result: ICustomer = await this.service.update(id, data);

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
