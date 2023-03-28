import { Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { MERCHANT } from '../../constants';
import { ErrorHelper } from '../../helpers';
import { IFindAndPaginateOptions, IFindAndPaginateResult, IPaginationRes } from '../../interfaces';
import { BranchServiceRepository } from './branch-services.repository';
import { BranchServices } from '../../database/entities';

@Injectable()
export class BranchServicesService {
  constructor(private branchServicesRepository: BranchServiceRepository) {}

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<BranchServices>> {
    const result: IFindAndPaginateResult<BranchServices> = await this.branchServicesRepository.findServiceGroups(query);

    return result;
  }

  findAll(page?: number, limit?: number): Promise<IPaginationRes<BranchServices>> {
    const getAllCondition = {};
    return this.branchServicesRepository.paginate(getAllCondition, page, limit);
  }

  async create(data: any): Promise<BranchServices> {
    return await this.branchServicesRepository.create(data);
  }

  async findById(id: number): Promise<BranchServices> {
    return this.branchServicesRepository.findById(id);
  }

  async updateBranchServiceGroup(id: number, params: any): Promise<BranchServices> {
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
