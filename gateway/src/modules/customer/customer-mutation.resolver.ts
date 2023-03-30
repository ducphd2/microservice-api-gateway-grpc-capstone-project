import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { GqlAuthGuard } from '../../guard';
import { ICreateCustomerResponse, ICustomerServiceGrpc } from '../../interfaces';
import {
  CreateCustomerInput,
  CustomerPayload,
  CustomerRegisterPayload,
  DeleteCustomerPayload,
  RegisterCustomer,
  TestUpdateDto,
  UserInput,
} from '../../types';
import { IUserServiceGrpc } from '../user/interfaces';

@Resolver()
export class CustomersMutationResolver implements OnModuleInit {
  private customerService: ICustomerServiceGrpc;
  private userService: IUserServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.CUSTOMER_SERVICE)
    private readonly customersServiceClient: ClientGrpcProxy,
    @Inject(EGrpcClientService.USER_SERVICE)
    private readonly usersServiceClient: ClientGrpcProxy,
    private authService: AuthService,
  ) {}

  onModuleInit(): void {
    this.customerService = this.customersServiceClient.getService<ICustomerServiceGrpc>(
      EGrpcClientService.CUSTOMER_SERVICE,
    );

    this.userService = this.usersServiceClient.getService<IUserServiceGrpc>(EGrpcClientService.USER_SERVICE);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CustomerPayload)
  async createCustomer(
    @Args('userInput') userInput: UserInput,
    @Args('customerInput') customerInput: CreateCustomerInput,
  ): Promise<CustomerPayload> {
    try {
      const { count } = await lastValueFrom(
        this.userService.count({
          where: JSON.stringify({ email: userInput.email }),
        }),
      );

      if (count >= 1) throw new Error('The email is taken');

      const { customer, user }: ICreateCustomerResponse = await lastValueFrom(
        this.customerService.create({
          userInput,
          customerInput,
        }),
      );

      return {
        user,
        customer,
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Mutation(() => CustomerRegisterPayload)
  async registerCustomer(@Args('data') data: RegisterCustomer): Promise<CustomerRegisterPayload> {
    try {
      const { count } = await lastValueFrom(
        this.userService.count({
          where: JSON.stringify({ email: data.email }),
        }),
      );

      if (count >= 1) throw new Error('The email is taken');

      const { customer, user }: ICreateCustomerResponse = await lastValueFrom(this.customerService.register(data));

      return {
        user,
        customer,
        accessToken: await this.authService.generateAccessToken(user),
        refreshToken: await this.authService.generateRefreshToken(user),
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CustomerPayload)
  async updateCustomer(@Args('id') id: number, @Args('data') data: TestUpdateDto): Promise<CustomerPayload> {
    const { customer, user }: ICreateCustomerResponse = await lastValueFrom(this.customerService.update({ id, data }));

    return { customer, user };
  }

  @Mutation(() => DeleteCustomerPayload)
  @UseGuards(GqlAuthGuard)
  async deleteCustomer(@Args('id') id: number): Promise<DeleteCustomerPayload> {
    return await lastValueFrom(
      this.customerService.destroy({
        where: JSON.stringify({
          id: id,
        }),
      }),
    );
  }
}
