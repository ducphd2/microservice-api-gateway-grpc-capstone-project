import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isEmpty } from 'lodash';
import { PinoLogger } from 'nestjs-pino';
import { FindOptions, Transaction } from 'sequelize';

import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../commons/find-and-paginate.interface';
import { IUsersService } from './users.interface';

import { Sequelize } from 'sequelize-typescript';
import { CustomersService } from '../customer/customers.service';
import { Customer } from '../database/models';
import { User } from '../database/models/user.model';
import { ErrorHelper } from '../helpers';
import { ICreateCustomer } from '../interfaces/customers';
import { IUserDto } from './dto';
import { EUserRole } from '../enums';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectModel(User) private readonly repo: typeof User,
    private readonly logger: PinoLogger,
    private readonly sequelize: Sequelize,
    private readonly customersService: CustomersService,
  ) {
    logger.setContext(UsersService.name);
  }

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<User>> {
    this.logger.info('UsersService#findAll.call %o', query);

    // @ts-ignore
    const result: IFindAndPaginateResult<User> = await this.repo.findAndPaginate({
      ...query,
      raw: true,
      paranoid: false,
    });

    this.logger.info('UsersService#findAll.result %o', result);

    return result;
  }

  async findById(id: number): Promise<User> {
    this.logger.info('UsersService#findById.call %o', id);

    const result: User = await this.repo.findByPk(id, {
      raw: true,
    });

    this.logger.info('UsersService#findById.result %o', result);

    return result;
  }

  async findOne(query: FindOptions): Promise<User> {
    this.logger.info('UsersService#findOne.call %o', query);

    const result: User = await this.repo.findOne({
      ...query,
      raw: true,
    });

    this.logger.info('UsersService#findOne.result %o', result);

    return result;
  }

  async count(query?: FindOptions): Promise<number> {
    this.logger.info('UsersService#count.call %o', query);

    const result: number = await this.repo.count(query);

    this.logger.info('UsersService#count.result %o', result);

    return result;
  }

  async create(user: IUserDto, transaction?: Transaction): Promise<User> {
    this.logger.info('UsersService#create.call %o', user);

    const result: User = await this.repo.create(user, { transaction });

    this.logger.info('UsersService#create.result %o', result);

    return result.toJSON();
  }

  async createCustomer(data: ICreateCustomer): Promise<any> {
    const transaction = await this.sequelize.transaction();

    try {
      this.logger.info('UsersService#createCustomer.call %o', data);

      const user: User = await this.create({ ...data.user, role: EUserRole.USER }, transaction);
      const customer: Customer = await this.customersService.create({ ...data.customer, userId: user.id }, transaction);

      await transaction.commit();
      this.logger.info('UsersService#createCustomer.result %o', user, customer);

      return {
        user,
        customer,
      };
    } catch (error) {
      await transaction.rollback();
      ErrorHelper.BadRequestException('Can not create customer user');
    }
  }

  async update(id: number, user: IUserDto): Promise<User> {
    this.logger.info('UsersService#update.call %o', user);

    const record: User = await this.repo.findByPk(id);

    if (isEmpty(record)) throw new Error('Record not found.');

    const result: User = await record.update(user);

    this.logger.info('UsersService#update.result %o', result);

    return result;
  }

  async destroy(query?: FindOptions): Promise<number> {
    this.logger.info('UsersService#destroy.call %o', query);

    const result: number = await this.repo.destroy(query);

    this.logger.info('UsersService#destroy.result %o', result);

    return result;
  }
}
