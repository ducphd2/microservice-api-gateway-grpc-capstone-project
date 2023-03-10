import { MikroORM } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Merchant } from '../database/entities';
import { InputCreateMerchantRequest } from '../interfaces';
import { MerchantBranchService } from '../merchant-branch/merchant-branch.service';

@Injectable()
export class MerchantService {
  constructor(
    private readonly orm: MikroORM,
    @InjectRepository(Merchant)
    private readonly merchantRepository: EntityRepository<Merchant>,
    private readonly merchantBranchService: MerchantBranchService,
  ) {}

  async createMerchantAndFirstBranch(data: InputCreateMerchantRequest) {
    const currentMerchant = await this.merchantRepository.findOne({
      profileId: data.profileId,
    });

    if (currentMerchant) {
      throw new RpcException({
        message: 'The merchant has already existed',
        code: HttpStatus.BAD_REQUEST,
      });
    }

    const newMerchant = new Merchant();

    newMerchant.profileId = data.profileId;
    newMerchant.name = data.merchantName;
    newMerchant.phone = data.merchantPhone;
    newMerchant.address = data.merchantAddress;
    newMerchant.cityCode = data.cityCode;
    newMerchant.districtCode = data.districtCode;
    newMerchant.wardCode = data.wardCode;

    const merchantDb = this.merchantRepository.create(newMerchant);

    await this.merchantRepository.persistAndFlush(merchantDb);

    const branch = await this.merchantBranchService.createBranchByMerchant(merchantDb.id, data);

    return {
      merchant: merchantDb,
      merchantBranch: branch,
    };
  }
}
