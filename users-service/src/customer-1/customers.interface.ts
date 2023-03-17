import { FindOptions } from 'sequelize';

import { Customer } from './customers.model';
import { CustomerDto } from './customers.dto';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../commons/find-and-paginate.interface';

export interface ICustomersService {
  find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<Customer>>;
  findById(id: string): Promise<Customer>;
  findOne(query?: FindOptions): Promise<Customer>;
  count(query?: FindOptions): Promise<number>;
  create(comment: CustomerDto): Promise<Customer>;
  update(id: string, comment: CustomerDto): Promise<Customer>;
  destroy(query?: FindOptions): Promise<number>;
}
