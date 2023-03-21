import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';

import { MerchantBranch } from '../../database/entities/merchant-branch.model';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../interfaces';

@Injectable()
export class MerchantBranchesRepository extends BaseRepository<MerchantBranch> {
  constructor(@InjectModel(MerchantBranch) readonly model: typeof MerchantBranch) {
    super(model);
  }

  async findBranches(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<MerchantBranch>> {
    // @ts-ignore
    const result: IFindAndPaginateResult<MerchantBranch> = await this.model.findAndPaginate({
      ...query,
      raw: true,
      paranoid: false,
    });

    return result;
  }
}
