import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { isEmpty } from 'lodash';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../enums/grpc-services.enum';
import { RefreshAuthGuard } from '../guard';
import { TestMerchantService } from '../modules/test-merchant/test-merchant.service';
import { ResponseLoginGrpc, ResponseRegisterGrpc, User, UserPayload } from '../types';
import { PasswordUtils } from '../utils/password.utils';
import { AuthService } from './auth.service';
import { InputLoginRequest } from './dtos/inputLoginRequest.dto';
import { InputRegisterRequest } from './dtos/inputRegisterRequest.dto';
import { IUserServiceGrpc } from './interfaces/authServiceGrpc';
import { CurrentUser } from './user.decorator';
import { IUserPayload } from '../modules/user/interfaces';

@Resolver()
export class AuthResolver implements OnModuleInit {
  private usersService: IUserServiceGrpc;

  constructor(
    private authService: AuthService,
    @Inject(EGrpcClientService.USER_SERVICE)
    private readonly usersServiceClient: ClientGrpcProxy,
    private readonly merchantService: TestMerchantService,

    private readonly passwordUtils: PasswordUtils,
  ) {}

  onModuleInit(): void {
    this.usersService = this.usersServiceClient.getService<IUserServiceGrpc>(EGrpcClientService.USER_SERVICE);
  }

  @Mutation(() => ResponseLoginGrpc)
  async login(@Context() context: any, @Args('data') data: InputLoginRequest): Promise<ResponseLoginGrpc> {
    try {
      const { res } = context;

      const user: any = await lastValueFrom(
        this.usersService.findOne({
          where: JSON.stringify({ email: data.email }),
        }),
      );

      if (isEmpty(user)) throw new Error('Unable to login');

      const isSame: boolean = await this.passwordUtils.compare(data.password, user.password);

      if (!isSame) throw new Error('Unable to login');

      res.cookie('access-token', await this.authService.generateAccessToken(user), {
        httpOnly: true,
        maxAge: 1.8e6,
      });
      res.cookie('refresh-token', await this.authService.generateRefreshToken(user), {
        httpOnly: true,
        maxAge: 1.728e8,
      });

      return {
        user,
        accessToken: await this.authService.generateAccessToken(user),
        refreshToken: await this.authService.generateRefreshToken(user),
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Mutation(() => ResponseRegisterGrpc)
  async register(@Args('data') data: InputRegisterRequest) {
    try {
      const { count } = await lastValueFrom(
        this.usersService.count({
          where: JSON.stringify({ email: data.email }),
        }),
      );

      if (count >= 1) throw new Error('Email taken');

      const user = await lastValueFrom(this.usersService.create(data));

      const { merchant, merchantBranch } = await this.merchantService.authCreateMerchantAndFirstBranch({
        ...data,
        userId: user.id,
      });

      return {
        merchant,
        merchantBranch,
        user: user,
        accessToken: await this.authService.generateAccessToken(user),
        refreshToken: await this.authService.generateRefreshToken(user),
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Mutation(() => UserPayload)
  @UseGuards(RefreshAuthGuard)
  async refreshToken(@Context() context: any, @CurrentUser() user: User): Promise<IUserPayload> {
    const { res } = context;

    res.cookie('access-token', await this.authService.generateAccessToken(user), {
      httpOnly: true,
      maxAge: 1.8e6,
    });
    res.cookie('refresh-token', await this.authService.generateRefreshToken(user), {
      httpOnly: true,
      maxAge: 1.728e8,
    });

    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: any): Promise<boolean> {
    const { res } = context;

    res.cookie('access-token', '', {
      httpOnly: true,
      maxAge: 0,
    });
    res.cookie('refresh-token', '', {
      httpOnly: true,
      maxAge: 0,
    });

    return true;
  }
}
