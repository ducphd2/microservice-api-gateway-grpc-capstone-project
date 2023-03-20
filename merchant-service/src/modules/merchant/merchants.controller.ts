import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ICount, IId, InputCreateMerchantRequest, UpdateMerchantInput } from '../../interfaces';
import { MerchantsService } from './merchants.services';
import { EGrpcClientService } from '../../enums';

@Controller()
export class MerchantsController {
  constructor(private merchantsService: MerchantsService) {}

  async getMerchants() {
    return this.merchantsService.getMerchants();
  }

  @GrpcMethod(EGrpcClientService.MERCHANT_SERVICE, 'create')
  async create(data: InputCreateMerchantRequest) {
    const result = await this.merchantsService.register(data);
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
}
