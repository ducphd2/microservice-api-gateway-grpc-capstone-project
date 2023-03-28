import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums';
import { IId, IQuery } from '../../interfaces';
import { IBranchServiceGroup, IBranchServiceGroupServiceGrpc } from '../../interfaces/branch-service-group';
import { BranchServiceGroup, BranchServiceGroupConnection } from '../../types';

@Injectable()
export class BranchServiceGroupService implements OnModuleInit {
  private branchServiceGroupService: IBranchServiceGroupServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE)
    private readonly merchantBranchesServiceClient: ClientGrpcProxy,
  ) {}

  onModuleInit() {
    this.branchServiceGroupService = this.merchantBranchesServiceClient.getService<IBranchServiceGroupServiceGrpc>(
      EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE,
    );
  }

  async find(query: IQuery): Promise<BranchServiceGroupConnection> {
    const result = await lastValueFrom(this.branchServiceGroupService.find(query));
    return result;
  }

  async findMerchantBranchById(data: IId): Promise<BranchServiceGroup> {
    const result = await lastValueFrom(this.branchServiceGroupService.findById(data));
    return result;
  }
}
