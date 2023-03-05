import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RpcException } from '@nestjs/microservices';
import { AuthGuard } from '../guard/auth.guard';
import { AuthService } from './auth.service';
import { InputLoginRequest } from './dtos/inputLoginRequest.dto';
import { InputRegisterRequest } from './dtos/inputRegisterRequest.dto';
import { ResponseAuthFromGrpc } from './interfaces/authServiceGrpc';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => ResponseAuthFromGrpc)
  async login(@Args('inputLogin') inputLogin: InputLoginRequest) {
    try {
      return await this.authService.login(inputLogin);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Mutation(() => ResponseAuthFromGrpc)
  async register(@Args('inputRegister') inputRegister: InputRegisterRequest) {
    try {
      return await this.authService.register(inputRegister);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(new AuthGuard())
  @Query(() => Boolean)
  async isAdmin(@Context() ctx: any): Promise<boolean> {
    const { id, email } = ctx.user;
    try {
      const checkPermission = await this.authService.isAdmin({ id, email });
      if (checkPermission) {
        return checkPermission.isAdmin;
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
