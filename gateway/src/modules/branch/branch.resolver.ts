import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MerchantBranchService } from './branch.service';
import { UseGuards } from '@nestjs/common';
import { MerchantBranch } from '../../types';
import { BranchDto } from './dtos';
import { DeleteBranchPayload, FindAllBranches } from './interfaces/merchant-branch-service-grpc';
import { GqlAuthGuard } from '../../guard';

@Resolver()
export class MerchantBranchResolver {
  constructor(private merchantService: MerchantBranchService) {}

  @Query(() => FindAllBranches)
  @UseGuards(GqlAuthGuard)
  async findBranches(): Promise<FindAllBranches> {
    return this.merchantService.find();
  }

  @Query(() => MerchantBranch)
  @UseGuards(GqlAuthGuard)
  async findBranchById(@Args('id') id: number): Promise<MerchantBranch> {
    return this.merchantService.findById(id);
  }

  @Mutation(() => MerchantBranch)
  @UseGuards(GqlAuthGuard)
  async createBranch(@Args('data') data: BranchDto): Promise<MerchantBranch> {
    return this.merchantService.create(data);
  }

  @Mutation(() => MerchantBranch)
  @UseGuards(GqlAuthGuard)
  async updateBranch(@Args('id') id: number, @Args('data') data: BranchDto): Promise<MerchantBranch> {
    return this.merchantService.update(id, data);
  }

  @Mutation(() => MerchantBranch)
  @UseGuards(GqlAuthGuard)
  async deleteBranch(@Args('id') id: number): Promise<DeleteBranchPayload> {
    return this.merchantService.delete(id);
  }
}
