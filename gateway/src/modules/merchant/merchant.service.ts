import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums';
import { IId } from '../../interfaces';
import { IMerchantServiceGrpc, IRegisterInput, IRegisterResponse } from '../../interfaces/merchants';
import { Merchant } from '../../types';
import { UpdateMerchantRequestInputDto } from './dtos/merchant';

@Injectable()
export class MerchantService {
  private merchantService: IMerchantServiceGrpc;

  constructor(@Inject(EGrpcClientService.MERCHANT_SERVICE) private readonly merchantsServiceClient: ClientGrpcProxy) {}

  onModuleInit() {
    this.merchantService = this.merchantsServiceClient.getService<IMerchantServiceGrpc>(
      EGrpcClientService.MERCHANT_SERVICE,
    );
  }

  async register(input: IRegisterInput): Promise<IRegisterResponse> {
    const result = await lastValueFrom(this.merchantService.create(input));
    return result;
  }

  async findMerchantById(data: IId): Promise<Merchant> {
    const result = await lastValueFrom(this.merchantService.findMerchantById(data));
    return result;
  }

  async findMerchants(): Promise<Merchant[]> {
    const result = await lastValueFrom(this.merchantService.findMerchants());
    return result;
  }

  async updateMerchant(input: UpdateMerchantRequestInputDto): Promise<Merchant> {
    const result = await lastValueFrom(this.merchantService.updateMerchant(input));
    return result;
  }
}
