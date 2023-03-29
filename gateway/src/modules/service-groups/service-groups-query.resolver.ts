import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RpcException } from '@nestjs/microservices';
import { isEmpty, merge } from 'lodash';
import { GqlAuthGuard } from '../../guard';
import { BranchServiceGroup, BranchServiceGroupConnection } from '../../types';
import { QueryUtils } from '../../utils/query.utils';
import { BranchServiceGroupService } from './service-groups.service';

@Resolver()
export class BranchServiceGroupQueryResolver {
  constructor(private branchServiceGroupService: BranchServiceGroupService, private readonly queryUtils: QueryUtils) {}

  @Query(() => BranchServiceGroup)
  @UseGuards(GqlAuthGuard)
  async findBranchServiceGroupById(@Args('id') id: number): Promise<BranchServiceGroup> {
    try {
      const result = await this.branchServiceGroupService.findById({ id });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => BranchServiceGroupConnection)
  @UseGuards(GqlAuthGuard)
  async findAllServiceGroups(
    @Args('q', { nullable: true }) q?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('last', { nullable: true }) last?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('after', { nullable: true }) after?: string,
    @Args('orderBy', { nullable: true }) orderBy?: string,
  ): Promise<BranchServiceGroupConnection> {
    const query = { where: {} };

    if (!isEmpty(q)) merge(query, { where: { fullName: { _iLike: `%${q}%` } } });

    merge(query, await this.queryUtils.buildQuery(orderBy, first, last, before, after));

    const result = await this.branchServiceGroupService.find({
      ...query,
      where: JSON.stringify(query.where),
    });

    return result;
  }
}
