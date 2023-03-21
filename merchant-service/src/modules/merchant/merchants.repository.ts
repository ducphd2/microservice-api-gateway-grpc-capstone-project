import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';
import { Merchant } from '../../database/entities/merchant.model';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../interfaces';

@Injectable()
export class MerchantsRepository extends BaseRepository<Merchant> {
  constructor(@InjectModel(Merchant) readonly model: typeof Merchant) {
    super(model);
  }

  async findMerchants(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<Merchant>> {
    // @ts-ignore
    const result: IFindAndPaginateResult<Merchant> = await this.model.findAndPaginate({
      ...query,
      raw: true,
      paranoid: false,
    });

    return result;
  }
}
