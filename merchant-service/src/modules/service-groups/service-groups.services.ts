import { Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { MERCHANT } from '../../constants';
import { ErrorHelper } from '../../helpers';
import { IFindAndPaginateOptions, IFindAndPaginateResult, IPaginationRes } from '../../interfaces';
import { ServiceGroupRepository } from './service-groups.repository';
import { ServiceGroup } from '../../database/entities/service-group.model';

@Injectable()
export class ServiceGroupService {
  constructor(private branchServicesRepository: ServiceGroupRepository) {}

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<ServiceGroup>> {
    const result: IFindAndPaginateResult<ServiceGroup> = await this.branchServicesRepository.findServiceGroups(query);

    return result;
  }

  findAll(page?: number, limit?: number): Promise<IPaginationRes<ServiceGroup>> {
    const getAllCondition = {};
    return this.branchServicesRepository.paginate(getAllCondition, page, limit);
  }

  async create(data: any): Promise<ServiceGroup> {
    return await this.branchServicesRepository.create(data);
  }

  async findById(id: number): Promise<ServiceGroup> {
    return this.branchServicesRepository.findById(id);
  }

  async updateBranchServiceGroup(id: number, params: any): Promise<ServiceGroup> {
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
