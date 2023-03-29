import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';

import { BranchService } from '../../database/entities';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../interfaces';

@Injectable()
export class BranchServicesRepository extends BaseRepository<BranchService> {
  constructor(@InjectModel(BranchService) readonly model: typeof BranchService) {
    super(model);
  }

  async findBranchServices(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<BranchService>> {
    // @ts-ignore
    const result: IFindAndPaginateResult<BranchService> = await this.model.findAndPaginate({
      ...query,
      raw: true,
      paranoid: false,
    });

    return result;
  }
}
