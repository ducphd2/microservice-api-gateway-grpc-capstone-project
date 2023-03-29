import { Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { MERCHANT } from '../../constants';
import { ErrorHelper } from '../../helpers';
import { IFindAndPaginateOptions, IFindAndPaginateResult, IPaginationRes } from '../../interfaces';
import { ServiceRepository } from './services.repository';
import { Service } from '../../database/entities';
import { BranchServicesService } from '../branch-services/branch-services.services';
import { ServerCredentials } from '@grpc/grpc-js';

@Injectable()
export class ServicesService {
  constructor(private servicesRepository: ServiceRepository, private branchServicesSvc: BranchServicesService) {}

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<Service>> {
    const result: IFindAndPaginateResult<Service> = await this.servicesRepository.findServiceGroups(query);

    return result;
  }

  findAll(page?: number, limit?: number): Promise<IPaginationRes<Service>> {
    const getAllCondition = {};
    return this.servicesRepository.paginate(getAllCondition, page, limit);
  }

  async create(data: any): Promise<Service> {
    const service = await this.servicesRepository.create(data);
    if (data.branchIds.length) {
      // Upsert many to all service and branchId to branch_services model
      // const branchServices =
    }
    return service;
  }

  async findById(id: number): Promise<Service> {
    return this.servicesRepository.findById(id);
  }

  async updateBranchServiceGroup(id: number, params: any): Promise<Service> {
    const branchServiceGroup = await this.findById(id);
    if (!branchServiceGroup) {
      ErrorHelper.BadRequestException(MERCHANT.MERCHANT_NOT_FOUND);
    }

    const updateByIdConditions: WhereOptions = { id: branchServiceGroup.id };
    const affectedRows = await this.servicesRepository.update({ ...params }, updateByIdConditions);

    return affectedRows[0];
  }

  async destroy(id: number): Promise<number> {
    const removeByIdConditions: WhereOptions = { id };

    return this.servicesRepository.delete(removeByIdConditions);
  }
}
