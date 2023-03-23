import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { GqlAuthGuard } from '../../guard';
import {
  CreateCustomerInput,
  Customer,
  CustomerPayload,
  DeleteCustomerPayload,
  TestUpdateDto,
  TestUserInput,
} from '../../types';
import { IUserServiceGrpc } from '../user/interfaces';
import { ICustomerServices } from './interfaces';

@Resolver()
export class CustomersMutationResolver implements OnModuleInit {
  private customerService: ICustomerServices;
  private userService: IUserServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.CUSTOMER_SERVICE)
    private readonly customersServiceClient: ClientGrpcProxy,
    @Inject(EGrpcClientService.USER_SERVICE)
    private readonly usersServiceClient: ClientGrpcProxy,
  ) {}

  onModuleInit(): void {
    this.customerService = this.customersServiceClient.getService<ICustomerServices>(
      EGrpcClientService.CUSTOMER_SERVICE,
    );

    this.userService = this.usersServiceClient.getService<IUserServiceGrpc>(EGrpcClientService.USER_SERVICE);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CustomerPayload)
  async createCustomer(
    @Args('userInput') userInput: TestUserInput,
    @Args('customerInput') customerInput: CreateCustomerInput,
  ): Promise<CustomerPayload> {
    try {
      const { count } = await lastValueFrom(
        this.userService.count({
          where: JSON.stringify({ email: userInput.email }),
        }),
      );

      if (count >= 1) throw new Error('The email is taken');

      const customer: Customer = await lastValueFrom(
        this.customerService.create({
          userInput,
          customerInput,
        }),
      );

      return {
        customer,
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CustomerPayload)
  async updateCustomer(@Args('id') id: number, @Args('data') data: TestUpdateDto): Promise<CustomerPayload> {
    const customer: Customer = await lastValueFrom(this.customerService.update({ id, data }));

    return { customer };
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
