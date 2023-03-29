import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums';
import { IId, IQuery } from '../../interfaces';
import { MerchantBranch, MerchantBranchConnection } from '../../types';
import { IMerchantBranchServiceGrpc } from './interfaces';

@Injectable()
export class MerchantBranchService {
  private merchantBranchService: IMerchantBranchServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.MERCHANT_BRANCH_SERVICE) private readonly merchantBranchesServiceClient: ClientGrpcProxy,
  ) {}

  onModuleInit() {
    this.merchantBranchService = this.merchantBranchesServiceClient.getService<IMerchantBranchServiceGrpc>(
      EGrpcClientService.MERCHANT_BRANCH_SERVICE,
    );
  }

  async findMerchantBranchById(data: IId): Promise<MerchantBranch> {
    const result = await lastValueFrom(this.merchantBranchService.findById(data));
    return result;
  }

  async findAllBranches(query: IQuery): Promise<MerchantBranchConnection> {
    const result = await lastValueFrom(this.merchantBranchService.findByUserId(query));
    return result;
  }
}
