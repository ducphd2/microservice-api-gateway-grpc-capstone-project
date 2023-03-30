import { Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { MERCHANT } from '../../constants';
import { Merchant } from '../../database/entities/merchant.model';
import { ErrorHelper } from '../../helpers';
import {
  IFindAndPaginateOptions,
  IFindAndPaginateResult,
  IMerchant,
  IPaginationRes,
  InputCreateMerchantRequest,
} from '../../interfaces';
import { MerchantBranchesService } from '../merchant-branch/merchant-branches.services';
import { MerchantsRepository } from './merchants.repository';
import { BranchServicesService } from '../branch-service/branch-services.services';
import { isNil } from 'lodash';
import { MerchantBranch } from '../../database/entities';

@Injectable()
export class MerchantsService {
  constructor(
    private merchantsRepository: MerchantsRepository,
    private merchantBranchesService: MerchantBranchesService,
    private branchServicesSvc: BranchServicesService,
  ) {}

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<Merchant>> {
    const result: IFindAndPaginateResult<Merchant> = await this.merchantsRepository.findMerchants(query);
    return result;
  }

  getMerchants(page?: number, limit?: number): Promise<IPaginationRes<Merchant>> {
    const getAllCondition = {};
    return this.merchantsRepository.paginate(getAllCondition, page, limit);
  }

  async createMerchant(data: any): Promise<Merchant> {
    return await this.merchantsRepository.create(data);
  }

  async findById(id: number): Promise<Merchant> {
    return await this.merchantsRepository.findById(id);
  }

  async updateMerchant(id: number, params: any): Promise<Merchant> {
    const merchant = await this.findById(id);
    if (!merchant) {
      ErrorHelper.BadRequestException(MERCHANT.MERCHANT_NOT_FOUND);
    }

    const updateByIdConditions: WhereOptions = { id: merchant.id };
    const affectedRows = await this.merchantsRepository.update({ ...params }, updateByIdConditions);

    return affectedRows[0];
  }

  async deleteMerchant(id: number): Promise<number> {
    const removeByIdConditions: WhereOptions = { id };

    return this.merchantsRepository.delete(removeByIdConditions);
  }

  async findMerchantByUserId(userId: number): Promise<Merchant> {
    return await this.merchantsRepository.findOne({
      where: {
        userId,
      },
    });
  }

  async register(data: InputCreateMerchantRequest): Promise<IMerchant> {
    const existedMerchant = await this.findMerchantByUserId(data.userId);

    if (existedMerchant) {
      ErrorHelper.BadRequestException('The merchant has already existed');
    }

    const merchant = await this.createMerchant(data);

    const branch = await this.merchantBranchesService.createMerchantBranch({ ...data, merchantId: merchant.id });

    return {
      ...merchant,
      branches: [branch],
    };
  }

  async findMerchantAndBranchDetailByBranchServiceId(
    branchServiceId: number,
  ): Promise<{ merchant: Merchant; branch: MerchantBranch }> {
    const branchService = await this.branchServicesSvc.findById(branchServiceId);

    if (isNil(branchService)) {
      ErrorHelper.NotFoundException('Branch service is not found');
    }

    const [merchant, branch] = await Promise.all([
      this.findById(branchService.merchantId),
      this.merchantBranchesService.findById(branchService.branchId),
    ]);

    return {
      merchant,
      branch,
    };
  }
}
