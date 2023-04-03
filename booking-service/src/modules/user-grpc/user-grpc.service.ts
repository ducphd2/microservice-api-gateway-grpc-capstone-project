import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { EGrpcClientService } from '../../enums';
import { IId, ICustomerAndUserResponse, IUser, IUserServiceGrpc, IQuery, ICustomerServiceGrpc } from '../../interfaces';

@Injectable()
export class UserGrpcService {
  private userSvc: IUserServiceGrpc;
  private customerSvc: ICustomerServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.USER_SERVICE)
    private readonly userSvcClient: ClientGrpcProxy,
    @Inject(EGrpcClientService.CUSTOMER_SERVICE)
    private readonly customerSvcClient: ClientGrpcProxy,
  ) {}

  onModuleInit() {
    this.userSvc = this.userSvcClient.getService<IUserServiceGrpc>(EGrpcClientService.USER_SERVICE);
    this.customerSvc = this.customerSvcClient.getService<ICustomerServiceGrpc>(EGrpcClientService.CUSTOMER_SERVICE);
  }

  async findUserById(data: IId): Promise<IUser> {
    const result = await lastValueFrom(this.userSvc.findUserById(data));
    return result;
  }

  async notificationFindUserAndCustomerDetailByCustomerId(query: IQuery): Promise<ICustomerAndUserResponse> {
    const result = await lastValueFrom(this.customerSvc.findOneCustomer(query));
    return result;
  }

  async bookingFindCustomerAndUserDetailByCustomerId(query: IQuery): Promise<ICustomerAndUserResponse> {
    const result = await lastValueFrom(this.customerSvc.findCustomerAndUserByCustomerIds(query));
    return result;
  }
}
