import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RpcException } from '@nestjs/microservices';
import { isEmpty, merge } from 'lodash';
import { CurrentUser } from '../../common/decorators';
import { GqlAuthGuard } from '../../guard';
import { MerchantBranch, MerchantBranchConnection } from '../../types';
import { QueryUtils } from '../../utils/query.utils';
import { MerchantBranchService } from './branch-service.service';

@Resolver()
export class BranchQueryResolver {
  constructor(private merchantBranchService: MerchantBranchService, private readonly queryUtils: QueryUtils) {}

  @Query(() => MerchantBranch)
  @UseGuards(GqlAuthGuard)
  async findMerchantBranchById(@Args('id') id: number): Promise<MerchantBranch> {
    try {
      const result = await this.merchantBranchService.findMerchantBranchById({ id });
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Query(() => MerchantBranchConnection)
  @UseGuards(GqlAuthGuard)
  async findAllBranches(
    @CurrentUser() user: any,
    @Args('q', { nullable: true }) q?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('last', { nullable: true }) last?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('after', { nullable: true }) after?: string,
    @Args('orderBy', { nullable: true }) orderBy?: string,
  ): Promise<MerchantBranchConnection> {
    try {
      const query = { where: { userId: user.id } };

      if (!isEmpty(q)) merge(query, { where: { name: { _iLike: `%${q}%` } } });

      merge(query, await this.queryUtils.buildQuery(orderBy, first, last, before, after));

      const result = await this.merchantBranchService.findAllBranches({
        ...query,
        where: JSON.stringify(query.where),
      });
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
