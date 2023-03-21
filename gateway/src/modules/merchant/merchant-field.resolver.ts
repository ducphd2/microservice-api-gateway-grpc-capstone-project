import { Inject, OnModuleInit } from '@nestjs/common';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { isEmpty, merge } from 'lodash';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { Merchant, MerchantBranchConnection } from '../../types';
import { QueryUtils } from '../../utils/query.utils';
import { IMerchantBranchServiceGrpc } from '../merchant-branch/interfaces';

@Resolver(() => Merchant)
export class MerchantFieldResolver implements OnModuleInit {
  private merchantBranchService: IMerchantBranchServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.MERCHANT_SERVICE)
    private readonly merchantsServiceClient: ClientGrpcProxy,

    @Inject(EGrpcClientService.MERCHANT_BRANCH_SERVICE)
    private readonly merchantBranchesServiceClient: ClientGrpcProxy,

    private readonly queryUtils: QueryUtils,
  ) {}

  onModuleInit(): void {
    this.merchantBranchService = this.merchantBranchesServiceClient.getService<IMerchantBranchServiceGrpc>(
      EGrpcClientService.MERCHANT_BRANCH_SERVICE,
    );
  }

  @ResolveField('branches', () => MerchantBranchConnection)
  async getMerchantBranches(
    @Parent() merchant: Merchant,
    @Args('q', { nullable: true }) q?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('last', { nullable: true }) last?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('after', { nullable: true }) after?: string,
    @Args('orderBy', { nullable: true }) orderBy?: string,
  ): Promise<MerchantBranchConnection> {
    const query = { where: { merchantId: merchant.id } };

    if (!isEmpty(q)) merge(query, { where: { name: { _iLike: `%${q}%` } } });

    merge(query, await this.queryUtils.buildQuery(orderBy, first, last, before, after));

    const merchantBranches = await lastValueFrom(
      this.merchantBranchService.find({
        ...query,
        where: JSON.stringify(query.where),
      }),
    );

    return merchantBranches;
  }
}
