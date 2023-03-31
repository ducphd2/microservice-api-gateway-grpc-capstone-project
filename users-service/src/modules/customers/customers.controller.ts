import Aigle from 'aigle';

import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { isEmpty, isNil } from 'lodash';

import { ICount, IQuery } from '../../commons/commons.interface';
import { IFindPayload } from '../../commons/cursor-pagination.interface';

import { CUSTOMER_MESSAGE } from '../../constants/messages';
import { Customer } from '../../database/models/customer.model';
import { EGrpcClientService, EUserRole } from '../../enums';
import { ErrorHelper } from '../../helpers';
import { IUserIncludeCustomer } from '../../interfaces';
import {
  ICreateCustomer,
  ICustomer,
  IRegisterCustomer,
  IRegisterCustomerResponse,
  IUpdateCustomerInput,
} from '../../interfaces/customers';
import { CustomersService } from './customers.service';

const { map } = Aigle;

@Controller()
export class CustomersController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly service: CustomersService) {}

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'find')
  async find(query: IQuery): Promise<IFindPayload<ICustomer>> {
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

    return result;
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'findById')
  async findById({ id }): Promise<ICustomer> {
    const result: ICustomer = await this.service.findById(id);

    if (isEmpty(result)) {
      ErrorHelper.NotFoundException(CUSTOMER_MESSAGE.CUSTOMER_NOT_FOUND);
    }

    return result;
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'findByUserId')
  async findByUserId({ id }): Promise<ICustomer> {
    const result: ICustomer = await this.findOne({
      where: JSON.stringify({
        userId: id,
      }),
    });

    if (isEmpty(result)) {
      ErrorHelper.NotFoundException(CUSTOMER_MESSAGE.CUSTOMER_NOT_FOUND);
    }

    return result;
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'findOne')
  async findOne(query: IQuery): Promise<Customer> {
    const result: Customer = await this.service.findOne({
      attributes: !isEmpty(query.select) ? query.select : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    if (isEmpty(result)) {
      ErrorHelper.NotFoundException(CUSTOMER_MESSAGE.CUSTOMER_NOT_FOUND);
    }

    return result;
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'count')
  async count(query: IQuery): Promise<ICount> {
    const count: number = await this.service.count({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    return { count };
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'create')
  async create(data: ICreateCustomer): Promise<ICustomer> {
    try {
      const result: ICustomer = await this.service.create({
        userInput: {
          ...data.userInput,
          role: EUserRole.USER,
        },
        customerInput: {
          ...data.customerInput,
        },
      });

      return result;
    } catch (error) {
      ErrorHelper.BadRequestException(CUSTOMER_MESSAGE.CAN_NOT_CREATE_CUSTOMER);
    }
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'register')
  async registerCustomer(data: IRegisterCustomer): Promise<IRegisterCustomerResponse> {
    try {
      const result: IRegisterCustomerResponse = await this.service.register(data);

      return result;
    } catch (error) {
      console.log(error);
      ErrorHelper.BadRequestException(CUSTOMER_MESSAGE.CAN_NOT_CREATE_CUSTOMER);
    }
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'update')
  async update({ data, id }: IUpdateCustomerInput): Promise<ICustomer> {
    const result: ICustomer = await this.service.update(id, data);

    return result;
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'destroy')
  async destroy(query: IQuery): Promise<ICount> {
    const count: number = await this.service.destroy({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    return { count };
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'findOneCustomer')
  async findOneCustomer(query: IQuery): Promise<IUserIncludeCustomer> {
    const result: IUserIncludeCustomer = await this.service.findOneCustomer({
      attributes: !isEmpty(query.select) ? query.select : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    if (isEmpty(result)) {
      ErrorHelper.NotFoundException(CUSTOMER_MESSAGE.CUSTOMER_NOT_FOUND);
    }

    return result;
  }
}
