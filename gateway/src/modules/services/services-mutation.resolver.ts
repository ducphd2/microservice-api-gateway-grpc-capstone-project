import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../guard';
import { ICount } from '../../interfaces';
import {
  BranchServicePayload,
  CreateBranchServiceInput,
  DeletePayload,
  PartialUpdateBranchService,
  PartialUpdateBranchServiceGroup,
} from '../../types';
import { BranchServicesService } from './services.service';
import { BranchServiceGroupService } from '../service-groups/service-groups.service';

@Resolver()
export class BranchServicesMutationResolver {
  constructor(
    private branchServicesSvc: BranchServicesService,
    private branchServiceGroupSvc: BranchServiceGroupService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => BranchServicePayload)
  async createBranchService(@Args('data') data: CreateBranchServiceInput): Promise<BranchServicePayload> {
    try {
      const serviceGroup = await this.branchServiceGroupSvc.findById({ id: data.serviceGroupId });

      if (!serviceGroup) {
        throw new Error('Service group not found');
      }

      const branchService = await this.branchServicesSvc.create({ ...data, merchantId: serviceGroup.merchantId });

      return { branchService };
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => BranchServicePayload)
  async updateBranchService(
    @Args('id') id: number,
    @Args('data') data: PartialUpdateBranchService,
  ): Promise<BranchServicePayload> {
    try {
      const branchService = await this.branchServicesSvc.update({ id, data });

      return { branchService };
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeletePayload)
  async deleteBranchService(@Args('id') id: number): Promise<ICount> {
    try {
      const result: ICount = await this.branchServicesSvc.destroy({ id });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
