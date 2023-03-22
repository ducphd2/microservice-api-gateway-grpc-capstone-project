import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MerchantBranchService } from './merchant-branch.service';
import { EGrpcClientService } from '../../enums';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { IMerchantBranchServiceGrpc } from './interfaces';
import { GqlAuthGuard } from '../../guard';
import { CreateBranchInput, MerchantBranch, MerchantBranchPayload } from '../../types';
import { lastValueFrom } from 'rxjs';

@Resolver()
export class MerchantResolver implements OnModuleInit {
  private merchantService: IMerchantBranchServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.MERCHANT_BRANCH_SERVICE)
    private readonly merchantBranchClient: ClientGrpcProxy,
  ) {}

  onModuleInit(): void {
    this.merchantService = this.merchantBranchClient.getService<IMerchantBranchServiceGrpc>(
      EGrpcClientService.MERCHANT_BRANCH_SERVICE,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MerchantBranchPayload)
  async createCustomer(@Args('data') data: CreateBranchInput): Promise<MerchantBranchPayload> {
    try {
      const branch: MerchantBranch = await lastValueFrom(this.merchantService.create(data));

      return { branch };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
