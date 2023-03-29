import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums';
import { GqlAuthGuard } from '../../guard';
import { ICount } from '../../interfaces';
import { IBranchServiceGroupServiceGrpc } from '../../interfaces/branch-service-group';
import {
  BranchServiceGroup,
  BranchServiceGroupPayload,
  CreateBranchServiceGroupInput,
  DeletePayload,
  PartialUpdateBranchServiceGroup,
} from '../../types';
import { MerchantService } from '../merchants/merchants.service';

@Resolver()
export class BranchServiceGroupMutationResolver implements OnModuleInit {
  private branchServiceGroupService: IBranchServiceGroupServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE)
    private readonly branchServiceGroupClient: ClientGrpcProxy,
    private readonly merchantService: MerchantService,
  ) {}

  onModuleInit(): void {
    this.branchServiceGroupService = this.branchServiceGroupClient.getService<IBranchServiceGroupServiceGrpc>(
      EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => BranchServiceGroupPayload)
  async createBranchServiceGroup(
    @Args('data') data: CreateBranchServiceGroupInput,
  ): Promise<BranchServiceGroupPayload> {
    try {
      const merchant = await this.merchantService.findById({ id: data.merchantId });

      if (!merchant) {
        throw new Error('Merchant not found');
      }

      const branchServiceGroup: BranchServiceGroup = await lastValueFrom(this.branchServiceGroupService.create(data));

      return { branchServiceGroup };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => BranchServiceGroupPayload)
  async updateBranchServiceGroup(
    @Args('id') id: number,
    @Args('data') data: PartialUpdateBranchServiceGroup,
  ): Promise<BranchServiceGroupPayload> {
    try {
      const branchServiceGroup: BranchServiceGroup = await lastValueFrom(
        this.branchServiceGroupService.update({ id, data }),
      );

      return { branchServiceGroup };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeletePayload)
  async deleteBranchServiceGroup(@Args('id') id: number): Promise<ICount> {
    try {
      const result: ICount = await lastValueFrom(this.branchServiceGroupService.destroy({ id }));

      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
