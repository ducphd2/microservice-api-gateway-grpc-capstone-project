import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums';
import { ICount, IId, IQuery, IQueryV2 } from '../../interfaces';
import {
  BranchService,
  BranchServiceConnection,
  BranchServicePaginationResponse,
  CreateBranchServiceInput,
  MerchantBranch,
  MerchantBranchConnection,
  UpdateBranchService,
} from '../../types';
import { IBranchServiceGrpc } from '../../interfaces/branch-service';

@Injectable()
export class BranchServicesService {
  private branchServiceGrpc: IBranchServiceGrpc;

  constructor(@Inject(EGrpcClientService.BRANCH_SERVICE_GRPC) private readonly branchServiceClient: ClientGrpcProxy) {}

  onModuleInit() {
    this.branchServiceGrpc = this.branchServiceClient.getService<IBranchServiceGrpc>(
      EGrpcClientService.BRANCH_SERVICE_GRPC,
    );
  }

  async findById(data: IId): Promise<BranchService> {
    const result = await lastValueFrom(this.branchServiceGrpc.findById(data));
    return result;
  }

  async findAllBranches(query: IQuery): Promise<BranchServiceConnection> {
    const result = await lastValueFrom(this.branchServiceGrpc.find(query));
    return result;
  }

  async findAllBranchesByMerchant(query: IQueryV2): Promise<BranchServicePaginationResponse> {
    const result = await lastValueFrom(this.branchServiceGrpc.findByMerchantId(query));
    return result;
  }

  async findAll(query: IQueryV2): Promise<BranchServicePaginationResponse> {
    const result = await lastValueFrom(this.branchServiceGrpc.findAll(query));
    return result;
  }

  async create(data: CreateBranchServiceInput): Promise<BranchService> {
    const result = await lastValueFrom(this.branchServiceGrpc.create(data));
    return result;
  }

  async update(data: UpdateBranchService): Promise<BranchService> {
    const result = await lastValueFrom(this.branchServiceGrpc.update(data));
    return result;
  }

  async destroy(id: IId): Promise<ICount> {
    const result = await lastValueFrom(this.branchServiceGrpc.destroy(id));
    return result;
  }
}
