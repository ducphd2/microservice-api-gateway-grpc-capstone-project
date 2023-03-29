import { Args, Query, Resolver } from '@nestjs/graphql';
import { MerchantService } from './merchants.service';
import { Merchant, MerchantConnection, User } from '../../types';
import { UseGuards } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GqlAuthGuard } from '../../guard';
import { isEmpty, merge } from 'lodash';
import { QueryUtils } from '../../utils/query.utils';
import { CurrentUser } from '../../common/decorators';

@Resolver()
export class MerchantQueryResolver {
  constructor(private merchantService: MerchantService, private readonly queryUtils: QueryUtils) {}

  @Query(() => Merchant)
  @UseGuards(GqlAuthGuard)
  async findMerchantById(@Args('id') id: number): Promise<Merchant> {
    try {
      const result = await this.merchantService.findById({ id });
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Query(() => MerchantConnection)
  @UseGuards(GqlAuthGuard)
  async findAllMerchants(
    @Args('q', { nullable: true }) q?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('last', { nullable: true }) last?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('after', { nullable: true }) after?: string,
    @Args('orderBy', { nullable: true }) orderBy?: string,
  ): Promise<MerchantConnection> {
    try {
      const query = { where: {} };

      if (!isEmpty(q)) merge(query, { where: { name: { _iLike: `%${q}%` } } });

      merge(query, await this.queryUtils.buildQuery(orderBy, first, last, before, after));

      const result = await this.merchantService.findAllMerchants({
        ...query,
        where: JSON.stringify(query.where),
      });
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Query(() => MerchantConnection)
  @UseGuards(GqlAuthGuard)
  async findAllMerchantsByAdmin(
    @CurrentUser() user: any,
    @Args('q', { nullable: true }) q?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('last', { nullable: true }) last?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('after', { nullable: true }) after?: string,
    @Args('orderBy', { nullable: true }) orderBy?: string,
  ): Promise<MerchantConnection> {
    try {
      const query = { where: { userId: user.id } };

      if (!isEmpty(q)) merge(query, { where: { name: { _iLike: `%${q}%` } } });

      merge(query, await this.queryUtils.buildQuery(orderBy, first, last, before, after));

      const result = await this.merchantService.findAllMerchants({
        ...query,
        where: JSON.stringify(query.where),
      });
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
