import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MerchantService } from './merchant.service';
import { InputCreateMerchantRequest } from '../interfaces';

@Controller()
export class MerchantController {
  constructor(private merchantService: MerchantService) {}

  @GrpcMethod('MerchantServiceGrpc', 'create')
  async create(data: InputCreateMerchantRequest) {
    const result = await this.merchantService.createMerchantAndFirstBranch(data);
    return result;
  }
}
