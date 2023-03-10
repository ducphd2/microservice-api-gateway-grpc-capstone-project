import { MikroORM } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { MerchantBranch } from '../database/entities';

@Injectable()
export class MerchantBranchService {
  constructor(
    private readonly orm: MikroORM,
    @InjectRepository(MerchantBranch)
    private readonly merchantBranchRepository: EntityRepository<MerchantBranch>,
  ) {}
  async createBranchByMerchant(merchantId: number, data: any): Promise<MerchantBranch> {
    const newBranch = new MerchantBranch();

    newBranch.profileId = data.profileId;
    newBranch.name = data.merchantName;
    newBranch.phone = data.merchantPhone;
    newBranch.address = data.merchantAddress;
    newBranch.cityCode = data.cityCode;
    newBranch.districtCode = data.districtCode;
    newBranch.wardCode = data.wardCode;
    newBranch.merchantId = merchantId;

    const branchDb = this.merchantBranchRepository.create(newBranch);

    await this.merchantBranchRepository.persistAndFlush(branchDb);

    return branchDb;
  }
}
