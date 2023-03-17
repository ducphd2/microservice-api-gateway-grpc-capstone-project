import { isEmpty } from 'lodash';
import { PinoLogger } from 'nestjs-pino';
import { Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

import { ICustomersService } from './customers.interface';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../commons/find-and-paginate.interface';

import { ICustomerDto } from './customers.dto';
import { Customer } from '../database/models';

@Injectable()
export class CustomersService implements ICustomersService {
  constructor(@InjectModel(Customer) private readonly repo: typeof Customer, private readonly logger: PinoLogger) {
    logger.setContext(CustomersService.name);
  }

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<Customer>> {
    this.logger.info('CustomersService#findAll.call %o', query);

    const result: any = await this.repo.paginate({
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

  async create(user: ICustomerDto): Promise<Customer> {
    this.logger.info('CustomersService#create.call %o', user);

    const result: Customer = await this.repo.create(user);

    this.logger.info('CustomersService#create.result %o', result);

    return result;
  }

  async update(id: number, user: ICustomerDto): Promise<Customer> {
    this.logger.info('CustomersService#update.call %o', user);

    const record: Customer = await this.repo.findByPk(id);

    if (isEmpty(record)) throw new Error('Record not found.');

    const result: Customer = await record.update(user);

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
