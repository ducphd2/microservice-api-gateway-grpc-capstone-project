import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { isEmpty, merge } from 'lodash';
import { CurrentUser } from '../../common/decorators';
import { GqlAuthGuard } from '../../guard';
import { BranchService, BranchServiceConnection } from '../../types';
import { QueryUtils } from '../../utils/query.utils';
import { BranchServicesService } from './services.service';

@Resolver()
export class BranchServicesQueryResolver {
  constructor(private branchServicesSvc: BranchServicesService, private readonly queryUtils: QueryUtils) {}

  @Query(() => BranchService)
  @UseGuards(GqlAuthGuard)
  async findBranchServiceById(@Args('id') id: number): Promise<BranchService> {
    try {
      const result = await this.branchServicesSvc.findById({ id });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => BranchServiceConnection)
  @UseGuards(GqlAuthGuard)
  async findAllBranchServices(
    @CurrentUser() user: any,
    @Args('q', { nullable: true }) q?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('last', { nullable: true }) last?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('after', { nullable: true }) after?: string,
    @Args('orderBy', { nullable: true }) orderBy?: string,
  ): Promise<BranchServiceConnection> {
    try {
      const query = { where: {} };

      if (!isEmpty(q)) merge(query, { where: { name: { _iLike: `%${q}%` } } });

      merge(query, await this.queryUtils.buildQuery(orderBy, first, last, before, after));

      const result = await this.branchServicesSvc.findAllBranches({
        ...query,
        where: JSON.stringify(query.where),
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
