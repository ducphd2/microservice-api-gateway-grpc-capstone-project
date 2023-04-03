import { Injectable } from '@nestjs/common';
import { PaginationResponse } from '@ntheanh201/nestjs-sequelize-pagination';
import { isEmpty } from 'lodash';
import { Sequelize, WhereOptions } from 'sequelize';
import { MERCHANT } from '../../constants';
import { BranchServices } from '../../database/entities';
import { ErrorHelper } from '../../helpers';
import { IFindAndPaginateOptions, IFindAndPaginateResult, IQueryV2 } from '../../interfaces';
import { ICreateBranchServicesInput } from '../../interfaces/branch-service';
import { BranchServiceRepository } from './branch-services.repository';

@Injectable()
export class BranchServicesService {
  constructor(private branchServicesRepository: BranchServiceRepository) {}

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<BranchServices>> {
    const result: IFindAndPaginateResult<BranchServices> = await this.branchServicesRepository.findServiceGroups(query);

    return result;
  }

  async findAll(query: IQueryV2): Promise<PaginationResponse<BranchServices>> {
    let whereQuery = {} as WhereOptions;
    const baseWhereQuery = !isEmpty(query.where) ? JSON.parse(query.where) : undefined;
    if (baseWhereQuery !== undefined) {
      whereQuery = !isEmpty(query.searchKey)
        ? {
            ...baseWhereQuery,
            tsv: Sequelize.literal(`plainto_tsquery('english', '${query.searchKey}') @@ tsv`),
          }
        : undefined;
    }

    const result = await this.branchServicesRepository.findAndPaginate({
      ...query,
      where: whereQuery,
    });

    return result;
  }

  async findByMerchantId(query?: IQueryV2): Promise<any> {
    const result = await this.findAll(query);

    return result;
  }

  // findAll(page?: number, limit?: number): Promise<IPaginationRes<BranchServices>> {
  //   const getAllCondition = {};
  //   return this.branchServicesRepository.paginate(getAllCondition, page, limit);
  // }

  async create(data: ICreateBranchServicesInput): Promise<BranchServices> {
    return await this.branchServicesRepository.create(data);
  }

  async findById(id: number): Promise<BranchServices> {
    return this.branchServicesRepository.findById(id);
  }

  async updateBranchServiceGroup(id: number, params: Partial<ICreateBranchServicesInput>): Promise<BranchServices> {
    const branchServiceGroup = await this.findById(id);
    if (!branchServiceGroup) {
      ErrorHelper.BadRequestException(MERCHANT.MERCHANT_NOT_FOUND);
    }

    const updateByIdConditions: WhereOptions = { id: branchServiceGroup.id };
    const affectedRows = await this.branchServicesRepository.update({ ...params }, updateByIdConditions);

    return affectedRows[0];
  }

  async destroy(id: number): Promise<number> {
    const removeByIdConditions: WhereOptions = { id };

    return this.branchServicesRepository.delete(removeByIdConditions);
  }
}
