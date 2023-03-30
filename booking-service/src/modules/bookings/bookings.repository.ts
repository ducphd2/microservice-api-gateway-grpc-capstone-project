import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';

import { Booking } from '../../database/models';
import { BaseRepository } from '../../database/base.repository';
import { IFindAndPaginateOptions, IPaginationRes } from '../../interfaces';

@Injectable()
export class BookingsRepository extends BaseRepository<Booking> {
  constructor(@InjectModel(Booking) readonly model: typeof Booking) {
    super(model);
  }

  async findAll(query?: IFindAndPaginateOptions, opts?: FindOptions): Promise<IPaginationRes<Booking>> {
    const result: IPaginationRes<Booking> = await this.paginate(query.where, query.page, query.limit, opts);

    return result;
  }
}
