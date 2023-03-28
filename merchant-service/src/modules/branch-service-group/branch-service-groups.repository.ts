import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';
import { BranchServiceGroups } from '../../database/entities/branch-service-group.model';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../interfaces';

@Injectable()
export class BranchServiceGroupRepository extends BaseRepository<BranchServiceGroups> {
  constructor(@InjectModel(BranchServiceGroups) readonly model: typeof BranchServiceGroups) {
    super(model);
  }

  async findServiceGroups(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<BranchServiceGroups>> {
    // @ts-ignore
    const result: IFindAndPaginateResult<BranchServiceGroups> = await this.model.findAndPaginate({
      ...query,
      raw: true,
      paranoid: false,
    });

    return result;
  }
}
