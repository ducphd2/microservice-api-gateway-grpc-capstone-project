import { HttpStatus, Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { User } from '../../types';
import { PasswordUtils } from '../../utils/password.utils';
import { ChangePasswordInput } from './dtos';
import { IUserServiceGrpc } from './interfaces';
import { GqlAuthGuard } from '../../guard';

@Resolver()
export class UserMutationResolver implements OnModuleInit {
  private userService: IUserServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.USER_SERVICE)
    private readonly customersServiceClient: ClientGrpcProxy,
    private readonly passwordUtils: PasswordUtils,
  ) {}

  onModuleInit(): void {
    this.userService = this.customersServiceClient.getService<IUserServiceGrpc>(EGrpcClientService.USER_SERVICE);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
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
