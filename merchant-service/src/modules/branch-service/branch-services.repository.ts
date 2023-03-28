import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';
import { BranchServices } from '../../database/entities/branch-service.model';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../interfaces';

@Injectable()
export class BranchServiceRepository extends BaseRepository<BranchServices> {
  constructor(@InjectModel(BranchServices) readonly model: typeof BranchServices) {
    super(model);
  }

  async findServiceGroups(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<BranchServices>> {
    // @ts-ignore
    const result: IFindAndPaginateResult<BranchServices> = await this.model.findAndPaginate({
      ...query,
      raw: true,
      paranoid: false,
    });

    return result;
  }
}
