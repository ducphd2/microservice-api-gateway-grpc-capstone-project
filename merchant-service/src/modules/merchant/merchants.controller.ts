import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ICount, IId, InputCreateMerchantRequest, UpdateMerchantInput } from '../../interfaces';
import { MerchantsService } from './merchants.services';

@Controller()
export class MerchantsController {
  constructor(private merchantsService: MerchantsService) {}

  async getMerchants() {
    return this.merchantsService.getMerchants();
  }

  @GrpcMethod('TestMerchantServiceGrpc', 'create')
  async create(data: InputCreateMerchantRequest) {
    const result = await this.merchantsService.createMerchantAndFirstBranch(data);
    return result;
  }

  @GrpcMethod('TestMerchantServiceGrpc', 'findMerchantById')
  async getMerchantDetail(data: IId) {
    const result = await this.merchantsService.findById(data.id);
    return result;
  }

  @GrpcMethod('TestMerchantServiceGrpc', 'update')
  async updateMerchant(updateData: UpdateMerchantInput) {
    const result = await this.merchantsService.updateMerchant(updateData.id, updateData.data);
    return result;
  }

  @GrpcMethod('TestMerchantServiceGrpc', 'delete')
  async deleteMerchant(data: IId): Promise<ICount> {
    const count: number = await this.merchantsService.deleteMerchant(data.id);

    return { count };
  }
}
