import { Injectable } from '@nestjs/common';
import { Attributes, WhereOptions } from 'sequelize';
import { MERCHANT } from '../../constants';
import { Merchant } from '../../database/entities/merchant.model';
import { ErrorHelper } from '../../helpers';
import { IPaginationRes, InputCreateMerchantRequest } from '../../interfaces';
import { MerchantsRepository } from './merchants.repository';
import { MerchantBranchesService } from '../merchant-branch/merchant-branches.services';

@Injectable()
export class MerchantsService {
  constructor(
    private merchantsRepository: MerchantsRepository,
    private merchantBranchesService: MerchantBranchesService,
  ) {}

  getMerchants(page?: number, limit?: number): Promise<IPaginationRes<Merchant>> {
    const getAllCondition = {};
    return this.merchantsRepository.paginate(getAllCondition, page, limit);
  }

  async createMerchant(data: Attributes<Merchant>): Promise<Merchant> {
    return await this.merchantsRepository.create(data);
  }

  async findById(id: number): Promise<Merchant> {
    const a = await this.merchantsRepository.findById(id);
    return a;
  }

  async updateMerchant(id: number, params: Attributes<Merchant>): Promise<Merchant> {
    const merchant = await this.findById(id);
    if (!merchant) {
      ErrorHelper.BadRequestException(MERCHANT.MERCHANT_NOT_FOUND);
    }

    const updatedMerchant = await this.merchantsRepository.updateItem(merchant, params);
    return updatedMerchant;
  }

  async deleteMerchant(id: number): Promise<number> {
    const removeByIdConditions: WhereOptions<Merchant> = { id };

    return this.merchantsRepository.delete(removeByIdConditions);
  }

  async findMerchantByProfileId(userId: number): Promise<Merchant> {
    return await this.merchantsRepository.findOne({
      where: {
        userId,
      },
    });
  }

  async createMerchantAndFirstBranch(data: InputCreateMerchantRequest) {
    const existedMerchant = await this.findMerchantByProfileId(data.userId);

    if (existedMerchant) {
      ErrorHelper.BadRequestException('The merchant has already existed');
    }

    const createData = {
      name: data.merchantName,
      phone: data.merchantPhone,
      address: data.merchantAddress,
      cityCode: data.cityCode,
      districtCode: data.districtCode,
      wardCode: data.wardCode,
      userId: data.userId,
    } as Merchant;

    const merchant = await this.createMerchant(createData);

    const branch = await this.merchantBranchesService.createMerchantBranch({ ...createData, merchantId: merchant.id });

    return {
      merchant: merchant,
      merchantBranch: branch,
    };
  }
}
