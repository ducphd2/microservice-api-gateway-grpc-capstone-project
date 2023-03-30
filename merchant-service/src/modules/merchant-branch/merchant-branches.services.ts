import { Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { MERCHANT_BRANCH } from '../../constants';
import { MerchantBranch } from '../../database/entities/merchant-branch.model';
import { ErrorHelper } from '../../helpers';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../interfaces';
import { IMerchantBranch } from '../../interfaces/merchant-branch';
import { MerchantBranchesRepository } from './merchant-branches.repository';

@Injectable()
export class MerchantBranchesService {
  constructor(private merchantBranchesRepository: MerchantBranchesRepository) {}

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<MerchantBranch>> {
    // @ts-ignore
    const result: IFindAndPaginateResult<Merchant> = await this.merchantBranchesRepository.findBranches(query);
    return result;
  }

  async createMerchantBranch(data: any): Promise<IMerchantBranch> {
    const branch = await this.merchantBranchesRepository.create(data);
    return branch.toJSON();
  }

  async findById(id: number): Promise<MerchantBranch> {
    return this.merchantBranchesRepository.findById(id);
  }

  async updateMerchantBranch(id: number, params: any): Promise<MerchantBranch> {
    const branch = await this.findById(id);
    if (!branch) {
      ErrorHelper.BadRequestException(MERCHANT_BRANCH.MERCHANT_NOT_FOUND);
    }

    const updateByIdConditions: WhereOptions = { id };
    const affectedRows = await this.merchantBranchesRepository.update({ ...params }, updateByIdConditions);
    return affectedRows[0];
  }

  async deleteBranch(id: number): Promise<number> {
    const removeByIdConditions: WhereOptions = { id };

    return this.merchantBranchesRepository.delete(removeByIdConditions);
  }
}
