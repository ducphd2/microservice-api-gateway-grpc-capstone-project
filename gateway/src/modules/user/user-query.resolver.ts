import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { isEmpty, merge } from 'lodash';
import { lastValueFrom } from 'rxjs';
import { CurrentUser } from '../../common/decorators';
import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { GqlAuthGuard } from '../../guard';
import { User, UsersConnection } from '../../types';
import { QueryUtils } from '../../utils/query.utils';
import { IUserConn, IUserServiceGrpc } from './interfaces';

@Resolver()
export class UserQueryResolver implements OnModuleInit {
  private userService: IUserServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.USER_SERVICE)
    private readonly usersServiceClient: ClientGrpcProxy,
    private readonly queryUtils: QueryUtils,
  ) {}

  onModuleInit(): void {
    this.userService = this.usersServiceClient.getService<IUserServiceGrpc>(EGrpcClientService.USER_SERVICE);
  }

  @Query(() => UsersConnection)
  @UseGuards(GqlAuthGuard)
  async getUsers(
    @Args('q', { nullable: true }) q?: string,
    @Args('first', { nullable: true }) first?: number,
    @Args('last', { nullable: true }) last?: number,
    @Args('before', { nullable: true }) before?: string,
    @Args('after', { nullable: true }) after?: string,
    @Args('orderBy', { nullable: true }) orderBy?: string,
  ): Promise<UsersConnection> {
    const query = { where: {} };

    if (!isEmpty(q)) merge(query, { where: { fullName: { _iLike: `%${q}%` } } });

    merge(query, await this.queryUtils.buildQuery(orderBy, first, last, before, after));

    const result = await lastValueFrom(
      this.userService.find({
        ...query,
        where: JSON.stringify(query.where),
      }),
    );

    return result;
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async getUser(@Args('id') id: number): Promise<User> {
    try {
      const user = await lastValueFrom(this.userService.findById({ id }));
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Query(() => Number, { name: 'userCount' })
  @UseGuards(GqlAuthGuard)
  async getUserCount(@Args('q', { nullable: true }) q: string): Promise<number> {
    // TODO: To implements filter by ...

    const query = { where: {} };

    if (!isEmpty(q)) merge(query, { where: { name: { _iLike: `%${q}%` } } });

    const { count } = await lastValueFrom(
      this.userService.count({
        ...query,
        where: JSON.stringify(query.where),
      }),
    );
    return count;
  }

  @Query(() => User, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return await lastValueFrom(this.userService.findById({ id: user.id }));
  }
}
