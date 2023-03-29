import { Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { MERCHANT_BRANCH } from '../../constants';
import { Branch } from '../../database/entities/merchant-branch.model';
import { ErrorHelper } from '../../helpers';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../interfaces';
import { IMerchantBranch } from '../../interfaces/merchant-branch';
import { BranchesRepository } from './branches.repository';

@Injectable()
export class BranchesService {
  constructor(private branchesRepository: BranchesRepository) {}

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<Branch>> {
    // @ts-ignore
    const result: IFindAndPaginateResult<Merchant> = await this.branchesRepository.findBranches(query);
    return result;
  }

  async createMerchantBranch(data: any): Promise<IMerchantBranch> {
    const branch = await this.branchesRepository.create(data);
    return branch.toJSON();
  }

  async findById(id: number): Promise<Branch> {
    return this.branchesRepository.findById(id);
  }

  async updateMerchantBranch(id: number, params: any): Promise<Branch> {
    const branch = await this.findById(id);
    if (!branch) {
      ErrorHelper.BadRequestException(MERCHANT_BRANCH.MERCHANT_NOT_FOUND);
    }

    const updateByIdConditions: WhereOptions = { id };
    const affectedRows = await this.branchesRepository.update({ ...params }, updateByIdConditions);
    return affectedRows[0];
  }

  async deleteBranch(id: number): Promise<number> {
    const removeByIdConditions: WhereOptions = { id };

    return this.branchesRepository.delete(removeByIdConditions);
  }
}
