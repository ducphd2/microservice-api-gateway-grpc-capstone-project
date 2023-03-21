import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RpcException } from '@nestjs/microservices';
import { GqlAuthGuard } from '../../guard';
import { Merchant, MerchantBranch } from '../../types';
import { MerchantBranchService } from './merchant-branch.service';

@Resolver()
export class MerchantQueryResolver {
  constructor(private merchantBranchService: MerchantBranchService) {}

  @Query(() => Merchant)
  @UseGuards(GqlAuthGuard)
  async findMerchantBranchById(@Args('id') id: number): Promise<MerchantBranch> {
    try {
      const result = await this.merchantBranchService.findMerchantBranchById({ id });
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
