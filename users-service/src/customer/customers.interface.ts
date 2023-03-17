import { FindOptions } from 'sequelize';

import { ICustomerDto } from './customers.dto';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../commons/find-and-paginate.interface';
import { Customer } from '../database/models';

export interface ICustomersService {
  find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<Customer>>;
  findById(id: number): Promise<Customer>;
  findOne(query?: FindOptions): Promise<Customer>;
  count(query?: FindOptions): Promise<number>;
  create(comment: ICustomerDto): Promise<Customer>;
  update(id: number, comment: ICustomerDto): Promise<Customer>;
  destroy(query?: FindOptions): Promise<number>;
}
