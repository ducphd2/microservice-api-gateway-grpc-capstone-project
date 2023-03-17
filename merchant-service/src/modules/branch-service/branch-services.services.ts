import { Injectable } from '@nestjs/common';
import { Attributes, WhereOptions } from 'sequelize';
import { MERCHANT } from '../../constants';
import { ErrorHelper } from '../../helpers';
import { IPaginationRes } from '../../interfaces';
import { BranchServicesRepository } from './branch-services.repository';
import { BranchServices } from '../../database/entities/branch-service.model';

@Injectable()
export class BranchServicesService {
  constructor(private branchServicesRepository: BranchServicesRepository) {}

  findAll(page?: number, limit?: number): Promise<IPaginationRes<BranchServices>> {
    const getAllCondition = {};
    return this.branchServicesRepository.paginate(getAllCondition, page, limit);
  }

  async create(data: Attributes<BranchServices>): Promise<BranchServices> {
    return await this.branchServicesRepository.create(data);
  }

  async findById(id: number): Promise<BranchServices> {
    return this.branchServicesRepository.findById(id);
  }

  async updateMerchantBranch(id: number, params: Attributes<BranchServices>): Promise<BranchServices> {
    const branchService = await this.findById(id);
    if (!branchService) {
      ErrorHelper.BadRequestException(MERCHANT.MERCHANT_NOT_FOUND);
    }

    return await this.branchServicesRepository.updateItem(branchService, params);
  }

  async delete(id: number): Promise<number> {
    const removeByIdConditions: WhereOptions<BranchServices> = { id };

    return this.branchServicesRepository.delete(removeByIdConditions);
  }
}
