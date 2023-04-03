import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { BaseRepository } from 'src/database/base.repository';
import { Customer } from '../../database/models';
import { IFindAndPaginateOptions, IPaginationRes } from '../../interfaces';

@Injectable()
export class CustomerRepository extends BaseRepository<Customer> {
  constructor(@InjectModel(Customer) readonly model: typeof Customer) {
    super(model);
  }

  async findAndPaginate(query?: IFindAndPaginateOptions, opts?: FindOptions): Promise<any> {
    const result: IPaginationRes<Customer> = await this.paginate(query.where, query.page, query.limit, opts);

    return result;
  }
}
