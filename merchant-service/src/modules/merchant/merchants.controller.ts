import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { isEmpty, isNil } from 'lodash';
import { Merchant } from '../../database/entities/merchant.model';
import { EGrpcClientService } from '../../enums';
import { ICount, IFindPayload, IId, IQuery, InputCreateMerchantRequest, UpdateMerchantInput } from '../../interfaces';
import { MerchantsService } from './merchants.services';

import Aigle from 'aigle';
import { MerchantBranch } from '../../database/entities';

const { map } = Aigle;

@Controller()
export class MerchantsController {
  constructor(private merchantsService: MerchantsService) {}

  @GrpcMethod(EGrpcClientService.MERCHANT_SERVICE, 'find')
  async find(query: IQuery): Promise<IFindPayload<Merchant>> {
    const { results, cursors } = await this.merchantsService.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<Merchant> = {
      edges: await map(results, async (merchant: Merchant) => ({
        node: merchant,
        cursor: Buffer.from(JSON.stringify([merchant.id])).toString('base64'),
      })),
      pageInfo: {
        startCursor: cursors.before || '',
        endCursor: cursors.after || '',
        hasNextPage: cursors.hasNext || false,
        hasPreviousPage: cursors.hasPrevious || false,
      },
    };

    return result;
  }

  @GrpcMethod(EGrpcClientService.MERCHANT_SERVICE, 'create')
  async create(data: InputCreateMerchantRequest) {
    const result = await this.merchantsService.register(data);
    return result;
  }

  @GrpcMethod(EGrpcClientService.MERCHANT_SERVICE, 'findById')
  async findById(data: IId) {
    const result = await this.merchantsService.findById(data.id);
    return result;
  }

  @GrpcMethod(EGrpcClientService.MERCHANT_SERVICE, 'findMerchantById')
  async getMerchantDetail(data: IId) {
    const result = await this.merchantsService.findById(data.id);
    return result;
  }

  @GrpcMethod(EGrpcClientService.MERCHANT_SERVICE, 'update')
  async updateMerchant(updateData: UpdateMerchantInput) {
    const result = await this.merchantsService.updateMerchant(updateData.id, updateData.data);
    return result;
  }

  @GrpcMethod(EGrpcClientService.MERCHANT_SERVICE, 'delete')
  async deleteMerchant(data: IId): Promise<ICount> {
    const count: number = await this.merchantsService.deleteMerchant(data.id);

    return { count };
  }

  @GrpcMethod(EGrpcClientService.MERCHANT_SERVICE, 'findMerchantAndBranchDetailByBranchServiceId')
  async findMerchantAndBranchDetailByBranchServiceId(
    data: IId,
  ): Promise<{ merchant: Merchant; branch: MerchantBranch }> {
    const result = await this.merchantsService.findMerchantAndBranchDetailByBranchServiceId(data.id);

    return result;
  }
}
