import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';
import { BranchServices } from '../../database/entities/branch-service.model';
import { IFindAndPaginateOptions, IFindAndPaginateResult, IPaginationRes, IQueryV2 } from '../../interfaces';
import { PaginationQuery, PaginationResponse, PaginationService } from '@ntheanh201/nestjs-sequelize-pagination';
import { Includeable } from 'sequelize/types';
import { isEmpty } from 'lodash';
import { Op } from 'sequelize';

@Injectable()
export class BranchServiceRepository extends BaseRepository<BranchServices> {
  constructor(
    @InjectModel(BranchServices) readonly model: typeof BranchServices,
    private paginationService: PaginationService,
  ) {
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

  async findAndPaginate(query?: IFindAndPaginateOptions): Promise<any> {
    const result: IPaginationRes<BranchServices> = await this.paginate(query.where, query.page, query.limit);

    return result;
  }
}
