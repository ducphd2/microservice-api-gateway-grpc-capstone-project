import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums';
import { GqlAuthGuard } from '../../guard';
import { ICount } from '../../interfaces';
import {
  CreateBranchInput,
  DeletePayload,
  MerchantBranch,
  MerchantBranchPayload,
  PartialUpdateBranchServiceGroup,
} from '../../types';
import { IMerchantBranchServiceGrpc } from './interfaces';

@Resolver()
export class BranchMutationResolver implements OnModuleInit {
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
  async createBranch(@Args('data') data: CreateBranchInput): Promise<MerchantBranchPayload> {
    try {
      const branch: MerchantBranch = await lastValueFrom(this.merchantService.create(data));

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
      const branch: MerchantBranch = await lastValueFrom(this.merchantService.update({ id, data }));

      return { branch };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeletePayload)
  async deleteBranch(@Args('id') id: number): Promise<ICount> {
    try {
      const result: ICount = await lastValueFrom(this.merchantService.destroy({ id }));

      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
