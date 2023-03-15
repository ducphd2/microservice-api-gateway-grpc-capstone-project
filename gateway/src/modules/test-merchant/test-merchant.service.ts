import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { InputRegisterRequest } from './dtos/inputRegisterRequest.dto';
import { IMerchantServiceGrpc, AuthFromGrpcMerchantResponse } from './interfaces/test-merchant-service-grpc';
import { IId } from '../../commons/commons.interface';
import { Merchant } from '../../types';
import { UpdateMerchantRequestInputDto } from './dtos/merchant';

@Injectable()
export class TestMerchantService {
  private merchantService: IMerchantServiceGrpc;

  constructor(@Inject('TEST_MERCHANT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.merchantService = this.client.getService<IMerchantServiceGrpc>('TestMerchantServiceGrpc');
  }

  async authCreateMerchantAndFirstBranch(registerInput: InputRegisterRequest): Promise<AuthFromGrpcMerchantResponse> {
    const result = await lastValueFrom(this.merchantService.create(registerInput));
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
