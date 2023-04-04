import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { isEmpty, merge } from 'lodash';
import { CurrentUser } from '../../common/decorators';
import { GqlAuthGuard } from '../../guard';
import { BranchService, BranchServiceConnection, BranchServicePaginationResponse } from '../../types';
import { QueryUtils } from '../../utils/query.utils';
import { BranchServicesService } from './branch-service.service';
import { ECommonOrderDirection } from '../../enums';

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

  @Query(() => BranchServicePaginationResponse)
  @UseGuards(GqlAuthGuard)
  async findAllBranchServicesByMerchant(
    @Args('merchantId') merchantId: number,
    @Args('q', { nullable: true }) q?: string,
    @Args('limit', { nullable: true }) limit?: number,
    @Args('page', { nullable: true }) page?: number,
    @Args('orderBy', { nullable: true }) orderBy?: string,
    @Args('orderDirection', { nullable: true }) orderDirection?: string,
  ): Promise<BranchServicePaginationResponse> {
    try {
      const query = {
        where: {
          merchantId,
        },
        searchKey: !isEmpty(q) ? `%${q}%` : undefined,
        page: page ? page : 1,
        limit: limit ? limit : 10,
        orderBy: orderBy ? orderBy : 'updatedAt',
        orderDirection: orderDirection ? orderDirection : 'DESC',
      };

      const result = await this.branchServicesSvc.findAllBranchesByMerchant({
        ...query,
        where: JSON.stringify(query.where),
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => BranchServicePaginationResponse)
  @UseGuards(GqlAuthGuard)
  async customerFindAllServices(
    @Args('q', { nullable: true }) q?: string,
    @Args('limit', { nullable: true }) limit?: number,
    @Args('page', { nullable: true }) page?: number,
    @Args('orderBy', { nullable: true }) orderBy?: string,
    @Args('orderDirection', { nullable: true, type: () => ECommonOrderDirection }) orderDirection?: string,
  ): Promise<BranchServicePaginationResponse> {
    try {
      const query = {
        searchKey: !isEmpty(q) ? q.toString() : undefined,
        page: page ? page : 1,
        limit: limit ? limit : 10,
        orderBy: orderBy ? orderBy : 'updatedAt',
        orderDirection: orderDirection ? orderDirection : 'DESC',
        where: {},
      };

      const result = await this.branchServicesSvc.findAll({
        ...query,
        where: JSON.stringify(query.where),
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
