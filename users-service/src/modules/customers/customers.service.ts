import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isEmpty } from 'lodash';
import { PinoLogger } from 'nestjs-pino';
import { FindOptions, Transaction, WhereOptions } from 'sequelize';

import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../commons/find-and-paginate.interface';

import { Customer, User } from '../../database/models';
import { ErrorHelper } from '../../helpers';
import { ICreateCustomer, ICustomer, ICustomersService, IUpdateCustomer } from '../../interfaces/customers';
import { Sequelize } from 'sequelize-typescript';
import { UsersService } from '../users/users.service';
import { EUserRole } from '../../enums';

@Injectable()
export class CustomersService implements ICustomersService {
  constructor(
    @InjectModel(Customer) private readonly repo: typeof Customer,
    private readonly logger: PinoLogger,
    private readonly sequelize: Sequelize,
    private readonly usersService: UsersService,
  ) {
    logger.setContext(CustomersService.name);
  }

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<Customer>> {
    this.logger.info('CustomersService#findAll.call %o', query);

    // @ts-ignore
    const result: IFindAndPaginateResult<Customer> = await this.repo.findAndPaginate({
      ...query,
      include: {
        model: User,
      },
      raw: true,
      nest: true,
      paranoid: false,
    });

    this.logger.info('CustomersService#findAll.result %o', result);

    return result;
  }

  async findById(id: number): Promise<ICustomer> {
    this.logger.info('CustomersService#findById.call %o', id);

    const result: Customer = await this.repo.findByPk(id, {
      include: [
        {
          model: User,
        },
      ],
      raw: true,
      nest: true,
    });

    this.logger.info('CustomersService#findById.result %o', result);

    return {
      ...result.user,
      ...result,
    };
  }

  async findOne(query: FindOptions): Promise<Customer> {
    this.logger.info('CustomersService#findOne.call %o', query);

    const result: Customer = await this.repo.findOne({
      ...query,
      raw: true,
    });

    this.logger.info('CustomersService#findOne.result %o', result);

    return result;
  }

  async count(query?: FindOptions): Promise<number> {
    this.logger.info('CustomersService#count.call %o', query);

    const result: number = await this.repo.count(query);

    this.logger.info('CustomersService#count.result %o', result);

    return result;
  }

  async createCustomer(data: ICustomer, transaction?: Transaction): Promise<ICustomer> {
    this.logger.info('UsersService#createCustomer.call %o', data);

    const customer: Customer = await this.repo.create({ ...data }, { transaction });

    return customer.toJSON();
  }

  async create(data: ICreateCustomer): Promise<ICustomer> {
    const transaction = await this.sequelize.transaction();

    try {
      this.logger.info('UsersService#createCustomer.call %o', data);

      const user: User = await this.usersService.create({ ...data.userInput, role: EUserRole.USER }, transaction);
      const customer: ICustomer = await this.createCustomer({ ...data.customerInput, userId: user.id }, transaction);

      await transaction.commit();
      this.logger.info('UsersService#createCustomer.result %o', user, customer);

      const res = {
        ...user.toJSON(),
        ...customer,
      };

      return res;
    } catch (error) {
      await transaction.rollback();
      ErrorHelper.BadRequestException('Can not create customer user');
    }
  }

  async updateCustomer(id: number, data: ICustomer, transaction?: Transaction): Promise<ICustomer> {
    this.logger.info('CustomersService#updateCustomer.call %o', data);

    const record: Customer = await this.repo.findByPk(id);

    if (isEmpty(record)) throw new Error('The customer not found');

    const [affectedCount, affectedRows] = await this.repo.update(data, {
      where: { id },
      returning: true,
      transaction,
    });

    this.logger.info('CustomersService#updateCustomer.result %o', affectedCount, affectedRows[0]);

    return affectedRows[0];
  }

  async update(id: number, { customerInput, userInput }: IUpdateCustomer): Promise<ICustomer> {
    this.logger.info('CustomersService#update.call %o', { customerInput, userInput });

    const transaction = await this.sequelize.transaction();

    try {
      const record: Customer = await this.repo.findByPk(id);

      if (isEmpty(record)) throw new Error('The customer not found');

      const user: User = await this.usersService.update(
        record.userId,
        { ...userInput, role: EUserRole.USER },
        transaction,
      );
      const customer: ICustomer = await this.updateCustomer(id, { ...customerInput, userId: user.id }, transaction);

      await transaction.commit();
      this.logger.info('UsersService#createCustomer.result %o', user, customer);

      const res = {
        ...user,
        ...customer,
      };

      return res;
    } catch (error) {
      console.log(error);

      await transaction.rollback();
      ErrorHelper.BadRequestException('Can not create customer user');
    }

    const record: Customer = await this.repo.findByPk(id, {
      include: [{ model: User }],
      raw: true,
      nest: true,
    });

    if (isEmpty(record)) throw new Error('The customer not found');

    const a = await this.repo.update(
      { ...customerInput },
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    const result: Customer = await this.repo.findByPk(id, {
      include: [{ model: User }],
      raw: true,
      nest: true,
    });

    this.logger.info('CustomersService#update.result %o', result);

    return {
      ...result.user,
      ...result,
    };
  }

  async destroy(query?: FindOptions): Promise<number> {
    this.logger.info('CustomersService#destroy.call %o', query);

    const result: number = await this.repo.destroy(query);

    this.logger.info('CustomersService#destroy.result %o', result);

    return result;
  }
}
