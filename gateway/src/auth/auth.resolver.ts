import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RpcException } from '@nestjs/microservices';
import { AuthGuard } from '../guard/auth.guard';
import { AuthService } from './auth.service';
import { InputLoginRequest } from './dtos/inputLoginRequest.dto';
import { InputRegisterRequest } from './dtos/inputRegisterRequest.dto';
import { ResponseAuthFromGrpc, ResponseUserAuthFromGrpc } from './interfaces/authServiceGrpc';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => ResponseUserAuthFromGrpc)
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
}
