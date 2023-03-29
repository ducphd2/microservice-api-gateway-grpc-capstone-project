import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';

import { Branch } from '../../database/entities/merchant-branch.model';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../interfaces';

@Injectable()
export class BranchesRepository extends BaseRepository<Branch> {
  constructor(@InjectModel(Branch) readonly model: typeof Branch) {
    super(model);
  }

  async findBranches(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<Branch>> {
    // @ts-ignore
    const result: IFindAndPaginateResult<Branch> = await this.model.findAndPaginate({
      ...query,
      raw: true,
      paranoid: false,
    });

    return result;
  }
}
