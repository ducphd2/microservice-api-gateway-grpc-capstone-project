import { Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { MERCHANT } from '../../constants';
import { ErrorHelper } from '../../helpers';
import {
  ICreateBranchServiceGroupInput,
  IFindAndPaginateOptions,
  IFindAndPaginateResult,
  IPaginationRes,
} from '../../interfaces';
import { BranchServiceGroupRepository } from './branch-service-groups.repository';
import { BranchServiceGroups } from '../../database/entities/branch-service-group.model';

@Injectable()
export class BranchServiceGroupService {
  constructor(private branchServicesRepository: BranchServiceGroupRepository) {}

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<BranchServiceGroups>> {
    const result: IFindAndPaginateResult<BranchServiceGroups> = await this.branchServicesRepository.findServiceGroups(
      query,
    );

    return result;
  }

  findAll(page?: number, limit?: number): Promise<IPaginationRes<BranchServiceGroups>> {
    const getAllCondition = {};
    return this.branchServicesRepository.paginate(getAllCondition, page, limit);
  }

  async create(data: ICreateBranchServiceGroupInput): Promise<BranchServiceGroups> {
    return await this.branchServicesRepository.create(data);
  }

  async findById(id: number): Promise<BranchServiceGroups> {
    return this.branchServicesRepository.findById(id);
  }

  async updateBranchServiceGroup(id: number, params: any): Promise<BranchServiceGroups> {
    const branchServiceGroup = await this.findById(id);
    if (!branchServiceGroup) {
      ErrorHelper.BadRequestException(MERCHANT.MERCHANT_NOT_FOUND);
    }

    const updateByIdConditions: WhereOptions = { id: branchServiceGroup.id };
    const affectedRows = await this.branchServicesRepository.update({ ...params }, updateByIdConditions);

    return affectedRows[0];
  }

  async delete(id: number): Promise<number> {
    const removeByIdConditions: WhereOptions = { id };

    return this.branchServicesRepository.delete(removeByIdConditions);
  }
}
