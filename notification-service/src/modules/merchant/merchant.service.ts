import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { EGrpcClientService } from '../../enums';
import {
  IId,
  IMerchant,
  IMerchantServiceGrpc,
  INotificationServiceFindMerchantAndBranchDetail,
} from '../../interfaces';

@Injectable()
export class MerchantService {
  private merchantService: IMerchantServiceGrpc;

  constructor(@Inject(EGrpcClientService.MERCHANT_SERVICE) private readonly merchantsServiceClient: ClientGrpcProxy) {}

  onModuleInit() {
    this.merchantService = this.merchantsServiceClient.getService<IMerchantServiceGrpc>(
      EGrpcClientService.MERCHANT_SERVICE,
    );
  }

  async findById(data: IId): Promise<IMerchant> {
    const result = await lastValueFrom(this.merchantService.findById(data));
    return result;
  }

  async findMerchantAndBranchDetailByBranchServiceId(
    data: IId,
  ): Promise<INotificationServiceFindMerchantAndBranchDetail> {
    const result = await lastValueFrom(this.merchantService.findMerchantAndBranchDetailByBranchServiceId(data));
    return result;
  }
}
