import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isEmpty } from 'lodash';
import { PinoLogger } from 'nestjs-pino';
import { FindOptions, Transaction } from 'sequelize';

import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../commons/find-and-paginate.interface';

import { Customer } from '../database/models';
import { ErrorHelper } from '../helpers';
import { ICustomer, ICustomersService } from '../interfaces/customers';

@Injectable()
export class CustomersService implements ICustomersService {
  constructor(@InjectModel(Customer) private readonly repo: typeof Customer, private readonly logger: PinoLogger) {
    logger.setContext(CustomersService.name);
  }

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<Customer>> {
    this.logger.info('CustomersService#findAll.call %o', query);

    // @ts-ignore
    const result: IFindAndPaginateResult<Customer> = await this.repo.findAndPaginate({
      ...query,
      raw: true,
      paranoid: false,
    });

    this.logger.info('CustomersService#findAll.result %o', result);

    return result;
  }

  async findById(id: number): Promise<Customer> {
    this.logger.info('CustomersService#findById.call %o', id);

    const result: Customer = await this.repo.findByPk(id, {
      raw: true,
    });

    this.logger.info('CustomersService#findById.result %o', result);

    return result;
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

  async create(customer: ICustomer, transaction?: Transaction): Promise<Customer> {
    try {
      this.logger.info('CustomersService#create.call %o', customer);

      const result: Customer = await this.repo.create(customer, { transaction });

      this.logger.info('CustomersService#create.result %o', result);

      return result.toJSON();
    } catch (error) {
      ErrorHelper.BadRequestException('Can not create customer user');
    }
  }

  async update(id: number, customer: ICustomer): Promise<Customer> {
    this.logger.info('CustomersService#update.call %o', customer);

    const record: Customer = await this.repo.findByPk(id);

    if (isEmpty(record)) throw new Error('Record not found.');

    const result: Customer = await record.update(customer);

    this.logger.info('CustomersService#update.result %o', result);

    return result;
  }

  async destroy(query?: FindOptions): Promise<number> {
    this.logger.info('CustomersService#destroy.call %o', query);

    const result: number = await this.repo.destroy(query);

    this.logger.info('CustomersService#destroy.result %o', result);

    return result;
  }
}
