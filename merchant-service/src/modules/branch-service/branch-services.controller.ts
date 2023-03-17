import { GrpcMethod } from '@nestjs/microservices';
import { ICount, IId } from '../../interfaces';
import { BranchServicesService } from './branch-services.services';
import { CreateBranchServicesInput, UpdateBranchServicesInput } from '../../interfaces/branch-service';

export class BranchServicesController {
  constructor(private branchServicesService: BranchServicesService) {}

  @GrpcMethod('TestMerchantBranchServicesServiceGrpc', 'findAll')
  async findAll() {
    return this.branchServicesService.findAll();
  }

  @GrpcMethod('TestMerchantBranchServicesServiceGrpc', 'create')
  async create(data: CreateBranchServicesInput) {
    const result = await this.branchServicesService.create(data);
    return result;
  }

  @GrpcMethod('TestMerchantBranchServicesServiceGrpc', 'findById')
  async findById({ id }: IId) {
    const result = await this.branchServicesService.findById(id);
    return result;
  }

  @GrpcMethod('TestMerchantBranchServicesServiceGrpc', 'update')
  async updateBranch({ id, data }: UpdateBranchServicesInput) {
    const result = await this.branchServicesService.updateMerchantBranch(id, data);
    return result;
  }

  @GrpcMethod('TestMerchantBranchServicesServiceGrpc', 'delete')
  async deleteBranch({ id }: IId): Promise<ICount> {
    const count = await this.branchServicesService.delete(id);
    return { count };
  }
}
