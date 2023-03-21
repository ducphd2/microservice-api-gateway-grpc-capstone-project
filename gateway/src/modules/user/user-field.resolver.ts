import { Inject, OnModuleInit } from '@nestjs/common';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { isEmpty, merge } from 'lodash';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { IMerchantServiceGrpc } from '../../interfaces/merchants';
import { IUserServiceGrpc } from '../../interfaces/users';
import { DeviceConnection, MerchantConnection, User } from '../../types';
import { QueryUtils } from '../../utils/query.utils';

@Resolver(() => User)
export class UserFieldResolver implements OnModuleInit {
  private merchantService: IMerchantServiceGrpc;
  private userServices: IUserServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.MERCHANT_SERVICE)
    private readonly merchantsServiceClient: ClientGrpcProxy,

    @Inject(EGrpcClientService.USER_SERVICE)
    private readonly userServiceGrpcClient: ClientGrpcProxy,

    private readonly queryUtils: QueryUtils,
  ) {}

  onModuleInit(): void {
    this.merchantService = this.merchantsServiceClient.getService<IMerchantServiceGrpc>(
      EGrpcClientService.MERCHANT_SERVICE,
    );

    this.userServices = this.userServiceGrpcClient.getService<IUserServiceGrpc>(EGrpcClientService.USER_SERVICE);
  }

  @ResolveField('merchants', () => MerchantConnection)
  async getMerchants(
    @Parent() user: User,
    @Args('q', { nullable: true }) q?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('last', { nullable: true }) last?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('after', { nullable: true }) after?: string,
    @Args('orderBy', { nullable: true }) orderBy?: string,
  ): Promise<MerchantConnection> {
    const query = { where: { userId: user.id } };

    if (!isEmpty(q)) merge(query, { where: { name: { _iLike: `%${q}%` } } });

    merge(query, await this.queryUtils.buildQuery(orderBy, first, last, before, after));

    const merchants = await lastValueFrom(
      this.merchantService.find({
        ...query,
        where: JSON.stringify(query.where),
      }),
    );

    return merchants;
  }

  @ResolveField('devices', () => DeviceConnection)
  async getDevices(@Parent() user: User): Promise<DeviceConnection> {
    const query = { where: { userId: user.id } };

    const merchants = await lastValueFrom(
      this.userServices.findDevices({
        ...query,
        where: JSON.stringify(query.where),
      }),
    );

    return merchants;
  }
}
