import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums';
import {
  ICount,
  ICreateCustomerInput,
  ICreateCustomerResponse,
  ICustomer,
  ICustomerServiceGrpc,
  IId,
  IQuery,
  IQueryV2,
  IUpdateCustomerInput,
} from '../../interfaces';
import { UserPaginationResponse } from '../../types';

@Injectable()
export class CustomerService {
  private customerServiceGrpc: ICustomerServiceGrpc;
  constructor(@Inject(EGrpcClientService.CUSTOMER_SERVICE) private readonly customerServiceClient: ClientGrpcProxy) {}

  onModuleInit() {
    this.customerServiceGrpc = this.customerServiceClient.getService<ICustomerServiceGrpc>(
      EGrpcClientService.CUSTOMER_SERVICE,
    );
  }

  async findById(data: IId): Promise<ICustomer> {
    const result = await lastValueFrom(this.customerServiceGrpc.findById(data));
    return result;
  }

  async findByUserId(data: IId): Promise<ICustomer> {
    const result = await lastValueFrom(this.customerServiceGrpc.findByUserId(data));
    return result;
  }

  async findAll(query: IQueryV2): Promise<UserPaginationResponse> {
    const result = await lastValueFrom(this.customerServiceGrpc.findAll(query));
    return result;
  }

  async create(data: ICreateCustomerInput): Promise<ICreateCustomerResponse> {
    const result = await lastValueFrom(this.customerServiceGrpc.create(data));
    return result;
  }

  async update(data: IUpdateCustomerInput): Promise<ICreateCustomerResponse> {
    const result = await lastValueFrom(this.customerServiceGrpc.update(data));
    return result;
  }

  async destroy(query?: IQuery): Promise<ICount> {
    const result = await lastValueFrom(this.customerServiceGrpc.destroy(query));
    return result;
  }
}
