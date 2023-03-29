import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums';
import { GqlAuthGuard } from '../../guard';
import { ICount } from '../../interfaces';
import { IBranchServiceGrpc } from '../../interfaces/merchants-branch';
import {
  CreateBranchInput,
  DeletePayload,
  Merchant,
  MerchantBranch,
  MerchantBranchPayload,
  PartialUpdateBranchServiceGroup,
} from '../../types';
import { IMerchantServiceGrpc } from '../../interfaces/merchants';

@Resolver()
export class BranchMutationResolver implements OnModuleInit {
  private branchService: IBranchServiceGrpc;
  private merchantService: IMerchantServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.MERCHANT_BRANCH_SERVICE)
    private readonly merchantBranchClient: ClientGrpcProxy,
    @Inject(EGrpcClientService.MERCHANT_SERVICE)
    private readonly merchantClient: ClientGrpcProxy,
  ) {}

  onModuleInit(): void {
    this.branchService = this.merchantBranchClient.getService<IBranchServiceGrpc>(
      EGrpcClientService.MERCHANT_BRANCH_SERVICE,
    );
    this.merchantService = this.merchantClient.getService<IMerchantServiceGrpc>(EGrpcClientService.MERCHANT_SERVICE);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MerchantBranchPayload)
  async createBranch(@Args('data') data: CreateBranchInput): Promise<MerchantBranchPayload> {
    try {
      const merchant: Merchant = await lastValueFrom(this.merchantService.findById({ id: data.merchantId }));

      if (!merchant) {
        throw new Error('Merchant not found');
      }

      const branch: MerchantBranch = await lastValueFrom(
        this.branchService.create({ ...data, userId: merchant.userId }),
      );

      return { branch };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MerchantBranchPayload)
  async updateBranch(
    @Args('id') id: number,
    @Args('data') data: PartialUpdateBranchServiceGroup,
  ): Promise<MerchantBranchPayload> {
    try {
      const branch: MerchantBranch = await lastValueFrom(this.branchService.update({ id, data }));

      return { branch };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeletePayload)
  async deleteBranch(@Args('id') id: number): Promise<ICount> {
    try {
      const result: ICount = await lastValueFrom(this.branchService.destroy({ id }));

      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
