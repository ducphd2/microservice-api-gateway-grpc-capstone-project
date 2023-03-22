import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Mutation, PartialType, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { isEmpty, merge } from 'lodash';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { GqlAuthGuard } from '../../guard';
import {
  CreateCustomerInput,
  Customer,
  CustomerPayload,
  CustomersConnection,
  DeleteCustomerPayload,
  PartialUpdateCustomer,
} from '../../types';
import { PasswordUtils } from '../../utils/password.utils';
import { QueryUtils } from '../../utils/query.utils';
import { IUserServiceGrpc } from '../user/interfaces';
import { ICustomerServices, ICustomersConnection } from './interfaces';

@Resolver()
export class CustomersMutationResolver implements OnModuleInit {
  private customerService: ICustomerServices;
  private userService: IUserServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.CUSTOMER_SERVICE)
    private readonly customersServiceClient: ClientGrpcProxy,
    @Inject(EGrpcClientService.USER_SERVICE)
    private readonly usersServiceClient: ClientGrpcProxy,
    private readonly passwordUtils: PasswordUtils,
    private readonly queryUtils: QueryUtils,
  ) {}

  onModuleInit(): void {
    this.customerService = this.customersServiceClient.getService<ICustomerServices>(
      EGrpcClientService.CUSTOMER_SERVICE,
    );

    this.userService = this.usersServiceClient.getService<IUserServiceGrpc>(EGrpcClientService.USER_SERVICE);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CustomerPayload)
  async createCustomer(@Args('data') data: CreateCustomerInput): Promise<CustomerPayload> {
    try {
      const { count } = await lastValueFrom(
        this.userService.count({
          where: JSON.stringify({ email: data.email }),
        }),
      );

      if (count >= 1) throw new Error('The email is taken');

      const customer: Customer = await lastValueFrom(this.customerService.create(data));

      return {
        customer,
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CustomerPayload)
  async updateCustomer(
    @Args('id') id: number,
    @Args('data', { type: () => PartialUpdateCustomer })
    data: Partial<CreateCustomerInput>,
  ): Promise<CustomerPayload> {
    const updatedCustomer: Customer = await lastValueFrom(
      this.customerService.update({
        id,
        data: {
          ...data,
        },
      }),
    );

    return { customer: updatedCustomer };
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

  @Query(() => CustomersConnection)
  @UseGuards(GqlAuthGuard)
  async getAllCustomer(
    @Args('q') q: string,
    @Args('first') first: number,
    @Args('last') last: number,
    @Args('before') before: string,
    @Args('after') after: string,
    @Args('orderBy') orderBy: string,
  ): Promise<ICustomersConnection> {
    const query = { where: {} };

    if (!isEmpty(q)) merge(query, { where: { fullName: { _iLike: `%${q}%` } } });

    merge(query, await this.queryUtils.buildQuery(orderBy, first, last, before, after));

    const result = await lastValueFrom(
      this.customerService.find({
        ...query,
        where: JSON.stringify(query.where),
      }),
    );

    return result;
  }
}
