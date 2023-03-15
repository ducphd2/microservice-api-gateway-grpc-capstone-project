import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MerchantBranchService } from './branch.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guard/auth.guard';
import { MerchantBranch } from '../../types';
import { BranchDto } from './dtos';
import { DeleteBranchPayload, FindAllBranches } from './interfaces/merchant-branch-service-grpc';

@Resolver()
export class MerchantBranchResolver {
  constructor(private merchantService: MerchantBranchService) {}

  @Query(() => FindAllBranches)
  @UseGuards(AuthGuard)
  async findBranches(): Promise<FindAllBranches> {
    return this.merchantService.find();
  }

  @Query(() => MerchantBranch)
  @UseGuards(AuthGuard)
  async findBranchById(@Args('id') id: number): Promise<MerchantBranch> {
    return this.merchantService.findById(id);
  }

  @Mutation(() => MerchantBranch)
  @UseGuards(AuthGuard)
  async createBranch(@Args('data') data: BranchDto): Promise<MerchantBranch> {
    return this.merchantService.create(data);
  }

  @Mutation(() => MerchantBranch)
  @UseGuards(AuthGuard)
  async updateBranch(@Args('id') id: number, @Args('data') data: BranchDto): Promise<MerchantBranch> {
    return this.merchantService.update(id, data);
  }

  @Mutation(() => MerchantBranch)
  @UseGuards(AuthGuard)
  async deleteBranch(@Args('id') id: number): Promise<DeleteBranchPayload> {
    return this.merchantService.delete(id);
  }
}
