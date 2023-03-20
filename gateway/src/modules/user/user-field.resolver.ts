import { Inject, OnModuleInit } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { isEmpty, merge } from 'lodash';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { QueryUtils } from '../../utils/query.utils';
import { IUserConn } from './interfaces';
import { IMerchantServiceGrpc } from '../../interfaces/merchants';
import { Merchant } from '../../types';

@Resolver(() => Merchant)
export class UserFieldResolver implements OnModuleInit {
  private merchantService: IMerchantServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.MERCHANT_SERVICE)
    private readonly merchantsServiceClient: ClientGrpcProxy,
    private readonly queryUtils: QueryUtils,
  ) {}

  onModuleInit(): void {
    this.merchantService = this.merchantsServiceClient.getService<IMerchantServiceGrpc>(
      EGrpcClientService.MERCHANT_SERVICE,
    );
  }

  @ResolveField('merchants', () => [Merchant])
  async getMerchants(
    @Args('q', { nullable: true }) q?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('last', { nullable: true }) last?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('after', { nullable: true }) after?: string,
    @Args('orderBy', { nullable: true }) orderBy?: string,
  ): Promise<IUserConn> {
    const query = { where: {} };

    if (!isEmpty(q)) merge(query, { where: { fullName: { _iLike: q } } });

    merge(query, await this.queryUtils.buildQuery(orderBy, first, last, before, after));

    const result = await lastValueFrom(
      this.merchantService.findMerchants({
        ...query,
        where: JSON.stringify(query.where),
      }),
    );

    return;
  }
}
