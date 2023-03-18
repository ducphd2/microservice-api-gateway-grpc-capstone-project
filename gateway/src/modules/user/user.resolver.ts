import { HttpStatus, Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { isEmpty, merge } from 'lodash';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { GqlAuthGuard } from '../../guard';
import { AuthGuard } from '../../guard/auth.guard';
import { User, UsersConnection } from '../../types';
import { PasswordUtils } from '../../utils/password.utils';
import { QueryUtils } from '../../utils/query.utils';
import { ChangePasswordInput } from './dtos';
import { IUserServiceGrpc, IUsersConnection } from './interfaces';

@Resolver()
export class UserResolver implements OnModuleInit {
  private userService: IUserServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.USER_SERVICE)
    private readonly customersServiceClient: ClientGrpcProxy,
    private readonly passwordUtils: PasswordUtils,
    private readonly queryUtils: QueryUtils,
  ) {}

  onModuleInit(): void {
    this.userService = this.customersServiceClient.getService<IUserServiceGrpc>(EGrpcClientService.USER_SERVICE);
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
  ): Promise<IUsersConnection> {
    const query = { where: {} };

    if (!isEmpty(q)) merge(query, { where: { fullName: { _iLike: q } } });

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
  @UseGuards(AuthGuard)
  async getUser(@Args('id') id: number): Promise<User> {
    try {
      const user = await lastValueFrom(this.userService.findById({ id }));
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async updatePassword(@Context() context: any, @Args('data') data: ChangePasswordInput) {
    try {
      const user = await lastValueFrom(this.userService.findById({ id: context.user.id }));
      const isSame: boolean = await this.passwordUtils.compare(data.currentPassword, user.password);
      const isConfirmed: boolean = data.newPassword === data.confirmPassword;

      if (!isSame || !isConfirmed) {
        throw new RpcException({
          code: HttpStatus.BAD_REQUEST,
          message: 'Error updating password. Kindly check your passwords',
        });
      }

      const password: string = await this.passwordUtils.hash(data.newPassword);

      const updatedUser: User = await lastValueFrom(
        this.userService.update({
          id: user.id,
          data: {
            password,
          },
        }),
      );

      return updatedUser;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
