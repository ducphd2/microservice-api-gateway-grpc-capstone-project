import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RpcException } from '@nestjs/microservices';
import { ChangePasswordInput } from './dtos';
import { UserFindByIdResponse } from './interfaces/userServiceGrpc';
import { UserService } from './user.service';
import { AuthGuard } from '../../guard/auth.guard';
import { User } from '../../types';
import { PasswordUtils } from '../../utils/password.utils';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService, private readonly passwordUtils: PasswordUtils) {}

  @Query(() => User)
  @UseGuards(AuthGuard)
  async getUser(@Args('id') id: number): Promise<User> {
    try {
      const { user, profile } = await this.userService.findById({ id });
      return {
        ...user,
        profile: profile,
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Mutation(() => UserFindByIdResponse)
  @UseGuards(AuthGuard)
  async updatePassword(@Context() context: any, @Args('data') data: ChangePasswordInput) {
    const { user, profile } = await this.userService.findById({ id: context.user.id });
    const isSame: boolean = await this.passwordUtils.compare(data.currentPassword, user.password);
    const isConfirmed: boolean = data.newPassword === data.confirmPassword;

    if (!isSame || !isConfirmed) {
      throw new Error('Error updating password. Kindly check your passwords.');
    }

    const password: string = await this.passwordUtils.hash(data.newPassword);

    const updatedUser: any = await this.userService.update({
      id: user.id,
      data: {
        password,
      },
    });

    return updatedUser;
  }
}
