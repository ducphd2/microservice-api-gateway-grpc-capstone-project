import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { InputRegisterRequest } from './dtos/inputRegisterRequest.dto';
import { MerchantServiceGrpc, AuthFromGrpcMerchantResponse } from './interfaces/merchantServiceGrpc';

@Injectable()
export class MerchantService {
  private merchantService: MerchantServiceGrpc;

  constructor(@Inject('MERCHANT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.merchantService = this.client.getService<MerchantServiceGrpc>('MerchantServiceGrpc');
  }

  async create(registerInput: InputRegisterRequest): Promise<AuthFromGrpcMerchantResponse> {
    const a = await lastValueFrom(this.merchantService.create(registerInput));
    return a;
  }
}
