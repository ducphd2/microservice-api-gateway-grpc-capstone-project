import { Injectable } from '@nestjs/common';
import { BulkCreateOptions, Transaction, WhereOptions } from 'sequelize';
import { MERCHANT_BRANCH } from '../../constants';
import { BranchService } from '../../database/entities';
import { ErrorHelper } from '../../helpers';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../interfaces';
import { IMerchantBranch } from '../../interfaces/merchant-branch';
import { BranchServicesRepository } from './branch-services.repository';

@Injectable()
export class BranchServicesService {
  constructor(private branchServicesRepository: BranchServicesRepository) {}

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<BranchService>> {
    const result: IFindAndPaginateResult<BranchService> = await this.branchServicesRepository.findBranchServices(query);
    return result;
  }

  async create(data: any): Promise<IMerchantBranch> {
    const branch = await this.branchServicesRepository.create(data);
    return branch.toJSON();
  }

  async findById(id: number): Promise<BranchService> {
    return this.branchServicesRepository.findById(id);
  }

  async update(id: number, params: any): Promise<BranchService> {
    const branch = await this.findById(id);
    if (!branch) {
      ErrorHelper.BadRequestException(MERCHANT_BRANCH.MERCHANT_NOT_FOUND);
    }

    const updateByIdConditions: WhereOptions = { id };
    const affectedRows = await this.branchServicesRepository.update({ ...params }, updateByIdConditions);
    return affectedRows[0];
  }

  async delete(id: number): Promise<number> {
    const removeByIdConditions: WhereOptions = { id };

    return this.branchServicesRepository.delete(removeByIdConditions);
  }

  async createMany(
    data: Record<string, any>[],
    transaction?: Transaction,
    options?: BulkCreateOptions,
  ): Promise<BranchService[]> {
    return this.branchServicesRepository.upsertMany(data, { ...options, transaction });
  }
}
