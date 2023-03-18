import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CurrentUser } from '../../auth/user.decorator';
import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { GqlAuthGuard } from '../../guard';
import { PasswordUtils } from '../../utils/password.utils';
import {
  CreateCustomerInputDto,
  Customer,
  CustomerPayload,
  CustomersConnection,
  DeleteCustomerPayload,
  UpdateCustomerInputDto,
  UpdatePasswordInput,
} from '../../types';
import { ICustomerServices, ICustomersConnection } from './interfaces';
import { isEmpty, merge } from 'lodash';
import { QueryUtils } from '../../utils/query.utils';

@Resolver()
export class CustomersMutationResolver implements OnModuleInit {
  private customerService: ICustomerServices;

  constructor(
    @Inject(EGrpcClientService.CUSTOMER_SERVICE)
    private readonly customersServiceClient: ClientGrpcProxy,
    private readonly passwordUtils: PasswordUtils,
    private readonly queryUtils: QueryUtils,
  ) {}

  onModuleInit(): void {
    this.customerService = this.customersServiceClient.getService<ICustomerServices>(
      EGrpcClientService.CUSTOMER_SERVICE,
    );
  }

  @Mutation(() => CustomerPayload)
  async createCustomer(@Args('data') data: CreateCustomerInputDto): Promise<CustomerPayload> {
    const { count } = await lastValueFrom(
      this.customerService.count({
        where: JSON.stringify({ email: data.email }),
      }),
    );

    if (count >= 1) throw new Error('Email taken');

    const customer: Customer = await lastValueFrom(
      this.customerService.create({
        ...data,
        password: await this.passwordUtils.hash(data.password),
      }),
    );

    return { customer };
  }

  @Mutation(() => CustomerPayload)
  @UseGuards(GqlAuthGuard)
  async updateProfile(
    @CurrentUser() customer: Customer,
    @Args('data') data: UpdateCustomerInputDto,
  ): Promise<CustomerPayload> {
    const updatedCustomer: Customer = await lastValueFrom(
      this.customerService.update({
        id: customer.id,
        data: {
          ...data,
        },
      }),
    );

    return { customer: updatedCustomer };
  }

  @Mutation(() => CustomerPayload)
  @UseGuards(GqlAuthGuard)
  async updatePassword(
    @CurrentUser() customer: Customer,
    @Args('data') data: UpdatePasswordInput,
  ): Promise<CustomerPayload> {
    const isSame: boolean = await this.passwordUtils.compare(data.currentPassword, customer.password);
    const isConfirmed: boolean = data.newPassword === data.confirmPassword;

    if (!isSame || !isConfirmed) {
      throw new Error('Error updating password. Kindly check your passwords.');
    }

    const password: string = await this.passwordUtils.hash(data.newPassword);

    const updatedCustomer: Customer = await lastValueFrom(
      this.customerService.update({
        id: customer.id,
        data: {
          password,
        },
      }),
    );

    return { customer: updatedCustomer };
  }

  @Mutation(() => DeleteCustomerPayload)
  @UseGuards(GqlAuthGuard)
  async deleteCustomer(@CurrentUser() customer: Customer): Promise<DeleteCustomerPayload> {
    return await lastValueFrom(
      this.customerService.destroy({
        where: JSON.stringify({
          id: customer.id,
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

    if (!isEmpty(q)) merge(query, { where: { fullName: { _iLike: q } } });

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
