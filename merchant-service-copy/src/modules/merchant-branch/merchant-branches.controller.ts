import { GrpcMethod } from '@nestjs/microservices';
import { CreateMerchantBranchRequestInput, UpdateMerchantBranchInput } from '../../interfaces/merchant-branch';
import { MerchantBranchesService } from './merchant-branches.services';
import { ICount, IId } from '../../interfaces';
import { Controller } from '@nestjs/common';

@Controller()
export class MerchantBranchesController {
  constructor(private merchantBranchesService: MerchantBranchesService) {}

  @GrpcMethod('MerchantBranchServiceGrpc', 'find')
  async findAll() {
    const a = await this.merchantBranchesService.getMerchantBranches();
    return {
      merchantBranches: a.items,
    };
  }

  @GrpcMethod('MerchantBranchServiceGrpc', 'create')
  async create(data: CreateMerchantBranchRequestInput) {
    const result = await this.merchantBranchesService.createMerchantBranch(data);
    return result;
  }

  @GrpcMethod('MerchantBranchServiceGrpc', 'findById')
  async findById({ id }: IId) {
    const result = await this.merchantBranchesService.findById(id);
    return result;
  }

  @GrpcMethod('MerchantBranchServiceGrpc', 'update')
  async updateBranch({ id, data }: UpdateMerchantBranchInput) {
    const result = await this.merchantBranchesService.updateMerchantBranch(id, data);
    return result;
  }

  @GrpcMethod('MerchantBranchServiceGrpc', 'delete')
  async deleteBranch({ id }: IId): Promise<ICount> {
    const count = await this.merchantBranchesService.deleteBranch(id);
    return { count };
  }
}
