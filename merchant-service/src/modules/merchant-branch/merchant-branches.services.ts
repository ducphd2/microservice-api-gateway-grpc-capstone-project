import { Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { MERCHANT } from '../../constants';
import { MerchantBranch } from '../../database/entities/merchant-branch.model';
import { ErrorHelper } from '../../helpers';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../interfaces';
import { MerchantBranchesRepository } from './merchant-branches.repository';

@Injectable()
export class MerchantBranchesService {
  constructor(private merchantBranchesRepository: MerchantBranchesRepository) {}

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<MerchantBranch>> {
    // @ts-ignore
    const result: IFindAndPaginateResult<Merchant> = await this.merchantBranchesRepository.findBranches(query);
    return result;
  }

  async createMerchantBranch(data: any): Promise<MerchantBranch> {
    return await this.merchantBranchesRepository.create(data);
  }

  async findById(id: number): Promise<MerchantBranch> {
    return this.merchantBranchesRepository.findById(id);
  }

  async updateMerchantBranch(id: number, params: any): Promise<MerchantBranch> {
    const branch = await this.findById(id);
    if (!branch) {
      ErrorHelper.BadRequestException(MERCHANT.MERCHANT_NOT_FOUND);
    }

    return await this.merchantBranchesRepository.updateItem(branch, params);
  }

  async deleteBranch(id: number): Promise<number> {
    const removeByIdConditions: WhereOptions = { id };

    return this.merchantBranchesRepository.delete(removeByIdConditions);
  }
}
