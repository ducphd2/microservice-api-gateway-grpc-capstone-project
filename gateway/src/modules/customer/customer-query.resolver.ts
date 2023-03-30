import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { isEmpty, merge } from 'lodash';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums';
import { GqlAuthGuard } from '../../guard';
import { ICustomer, ICustomerServiceGrpc, ICustomersConnection } from '../../interfaces';
import { Customer, CustomersConnection } from '../../types';
import { QueryUtils } from '../../utils/query.utils';

@Resolver()
export class CustomerQueryResolver implements OnModuleInit {
  private customerService: ICustomerServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.CUSTOMER_SERVICE)
    private readonly customersServiceClient: ClientGrpcProxy,
    private readonly queryUtils: QueryUtils,
  ) {}

  onModuleInit(): void {
    this.customerService = this.customersServiceClient.getService<ICustomerServiceGrpc>(
      EGrpcClientService.CUSTOMER_SERVICE,
    );
  }

  @Query(() => CustomersConnection)
  @UseGuards(GqlAuthGuard)
  async getAllCustomer(
    @Args('q', { nullable: true }) q?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('last', { nullable: true }) last?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('after', { nullable: true }) after?: string,
    @Args('orderBy', { nullable: true }) orderBy?: string,
  ): Promise<ICustomersConnection> {
    const query = { where: {} };

    if (!isEmpty(q)) merge(query, { where: { fullName: { _iLike: `%${q}%` } } });

    merge(query, await this.queryUtils.buildQuery(orderBy, first, last, before, after));

    const result = await lastValueFrom(
      this.customerService.find({
        ...query,
        where: JSON.stringify(query.where),
      }),
    );

    return result;
  }

  @Query(() => Customer)
  @UseGuards(GqlAuthGuard)
  async getCustomerById(@Args('id', { type: () => Int }) id: number): Promise<ICustomer> {
    const result = await lastValueFrom(
      this.customerService.findById({
        id,
      }),
    );

    return result;
  }
}
