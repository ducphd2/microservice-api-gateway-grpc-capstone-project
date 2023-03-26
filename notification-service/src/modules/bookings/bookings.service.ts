import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { IFindCustomerResponse, IUserServiceGrpc } from '../../interfaces/users';

@Injectable()
export class NotificationBookingUserService implements OnModuleInit {
  private userService: IUserServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.USER_SERVICE)
    private readonly userServiceGrpc: ClientGrpcProxy,
  ) {}

  onModuleInit(): void {
    this.userService = this.userServiceGrpc.getService<IUserServiceGrpc>(EGrpcClientService.USER_SERVICE);
  }

  async getCustomerFromUserServiceGrpc(customerId: number, branchServiceId: number): Promise<IFindCustomerResponse> {
    try {
      const resData: IFindCustomerResponse = await lastValueFrom(
        this.userService.GetUserDataFromNotificationService({
          customerId,
          branchServiceId,
        }),
      );

      return resData;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
