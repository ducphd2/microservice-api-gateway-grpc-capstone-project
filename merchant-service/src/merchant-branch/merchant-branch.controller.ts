import { Controller } from '@nestjs/common';
import { InputCreateMerchantRequest } from '../interfaces';
import { MerchantBranchService } from './merchant-branch.service';

@Controller()
export class MerchantController {
  constructor(private merchantService: MerchantBranchService) {}

  async createMerchantBranch(merchantId: number, data: InputCreateMerchantRequest): Promise<any> {
    const result = await this.merchantService.createBranchByMerchant(merchantId, data);
    return result;
  }
}
