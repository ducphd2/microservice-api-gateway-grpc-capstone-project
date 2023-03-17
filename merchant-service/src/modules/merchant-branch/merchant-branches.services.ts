import { Injectable } from '@nestjs/common';
import { Attributes, WhereOptions } from 'sequelize';
import { MERCHANT } from '../../constants';
import { ErrorHelper } from '../../helpers';
import { IPaginationRes } from '../../interfaces';
import { MerchantBranchesRepository } from './merchant-branches.repository';
import { MerchantBranch } from '../../database/entities/merchant-branch.model';

@Injectable()
export class MerchantBranchesService {
  constructor(private merchantBranchesRepository: MerchantBranchesRepository) {}

  getMerchantBranches(page?: number, limit?: number): Promise<IPaginationRes<MerchantBranch>> {
    const getAllCondition = {};
    return this.merchantBranchesRepository.paginate(getAllCondition, page, limit);
  }

  async createMerchantBranch(data: Attributes<MerchantBranch>): Promise<MerchantBranch> {
    return await this.merchantBranchesRepository.create(data);
  }

  async findById(id: number): Promise<MerchantBranch> {
    return this.merchantBranchesRepository.findById(id);
  }

  async updateMerchantBranch(id: number, params: Attributes<MerchantBranch>): Promise<MerchantBranch> {
    const branch = await this.findById(id);
    if (!branch) {
      ErrorHelper.BadRequestException(MERCHANT.MERCHANT_NOT_FOUND);
    }

    return await this.merchantBranchesRepository.updateItem(branch, params);
  }

  async deleteBranch(id: number): Promise<number> {
    const removeByIdConditions: WhereOptions<MerchantBranch> = { id };

    return this.merchantBranchesRepository.delete(removeByIdConditions);
  }
}
