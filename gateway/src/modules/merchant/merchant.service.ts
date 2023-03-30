import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums';
import { IId, IQuery, IQueryV2 } from '../../interfaces';
import { IMerchantServiceGrpc, IRegisterInput, IRegisterResponse } from '../../interfaces/merchants';
import { Merchant, MerchantConnection } from '../../types';
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

  async register(input: IRegisterInput): Promise<Merchant> {
    const result = await lastValueFrom(this.merchantService.create(input));
    return result;
  }

  async findMerchantById(data: IId): Promise<Merchant> {
    const result = await lastValueFrom(this.merchantService.findMerchantById(data));
    return result;
  }

  async updateMerchant(input: UpdateMerchantRequestInputDto): Promise<Merchant> {
    const result = await lastValueFrom(this.merchantService.updateMerchant(input));
    return result;
  }

  async findAllMerchants(query: IQuery): Promise<MerchantConnection> {
    const result = await lastValueFrom(this.merchantService.find(query));
    return result;
  }

  async findById(data: IId): Promise<Merchant> {
    const result = await lastValueFrom(this.merchantService.findById(data));
    return result;
  }

  async findOne(query: IQueryV2): Promise<Merchant> {
    const result = await lastValueFrom(this.merchantService.findOne(query));
    return result;
  }
}
