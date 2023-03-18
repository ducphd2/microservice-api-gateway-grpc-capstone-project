import Aigle from 'aigle';

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { isEmpty, isNil } from 'lodash';
import { PinoLogger } from 'nestjs-pino';

import { ICount, IQuery } from '../commons/commons.interface';
import { IFindPayload } from '../commons/cursor-pagination.interface';

import { USER_MESSAGE } from '../constants';
import { User } from '../database/models/user.model';
import { EGrpcClientService } from '../enums';
import { ErrorHelper } from '../helpers';
import { IId } from '../interfaces';
import { ICreateCustomer } from '../interfaces/customers';
import { IUserDto } from './dto';
import { UsersService } from './users.service';

const { map } = Aigle;

@Controller()
export class UsersController {
  constructor(private readonly service: UsersService, private readonly logger: PinoLogger) {
    logger.setContext(UsersController.name);
  }

  @GrpcMethod(EGrpcClientService.USER_SERVICE, 'create')
  async create(data: IUserDto): Promise<User> {
    this.logger.info('UsersController#create.call %o', data);

    const result: User = await this.service.create(data);

    this.logger.info('UsersController#create.result %o', result);

    return result;
  }

  @GrpcMethod(EGrpcClientService.CUSTOMER_SERVICE, 'create')
  async createCustomer(data: ICreateCustomer): Promise<any> {
    try {
      this.logger.info('UsersController#createCustomer.call %o', data);

      const result: any = await this.service.createCustomer(data);

      this.logger.info('UsersController#create.result %o', result);

      return result;
    } catch (error) {
      ErrorHelper.BadRequestException('Can not create customer');
    }
  }

  @GrpcMethod(EGrpcClientService.USER_SERVICE, 'find')
  async find(query: IQuery): Promise<IFindPayload<User>> {
    this.logger.info('UsersController#findAll.call %o', query);

    const { results, cursors } = await this.service.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<User> = {
      edges: await map(results, async (user: User) => ({
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

    this.logger.info('UsersController#findAll.result %o', result);

    return result;
  }

  @GrpcMethod(EGrpcClientService.USER_SERVICE, 'findById')
  async findById({ id }: IId): Promise<User> {
    this.logger.info('UsersController#findById.call %o', id);

    const result: User = await this.service.findById(id);

    this.logger.info('UsersController#findById.result %o', result);

    if (isEmpty(result)) throw new Error('Record not found.');

    return result;
  }

  @GrpcMethod(EGrpcClientService.USER_SERVICE, 'findOne')
  async findOne(query: IQuery): Promise<User> {
    this.logger.info('UsersController#findOne.call %o', query);

    const result: User = await this.service.findOne({
      attributes: !isEmpty(query.select) ? query.select : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    this.logger.info('UsersController#findOne.result %o', result);

    if (isEmpty(result)) ErrorHelper.NotFoundException(USER_MESSAGE.USER_NOT_FOUND);

    return result;
  }

  @GrpcMethod(EGrpcClientService.USER_SERVICE, 'count')
  async count(query: IQuery): Promise<ICount> {
    this.logger.info('UsersController#count.call %o', query);

    const count: number = await this.service.count({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    this.logger.info('UsersController#count.result %o', count);

    return { count };
  }

  @GrpcMethod(EGrpcClientService.USER_SERVICE, 'update')
  async update({ id, data }): Promise<User> {
    this.logger.info('UsersController#update.call %o %o', id, data);

    const result: User = await this.service.update(id, data);

    this.logger.info('UsersController#update.result %o', result);

    return result;
  }

  @GrpcMethod(EGrpcClientService.USER_SERVICE, 'destroy')
  async destroy(query: IQuery): Promise<ICount> {
    this.logger.info('UsersController#destroy.call %o', query);

    const count: number = await this.service.destroy({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    this.logger.info('UsersController#destroy.result %o', count);

    return { count };
  }
}
