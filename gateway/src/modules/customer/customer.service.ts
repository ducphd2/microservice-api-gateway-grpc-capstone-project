import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums';
import { ICount, ICustomerServiceGrpc, IId, IQueryV2 } from '../../interfaces';
import { CreateUserInputDto, Customer, UserPaginationResponse } from '../../types';

@Injectable()
export class CustomerService {
  private userServiceGrpc: ICustomerServiceGrpc;
  constructor(@Inject(EGrpcClientService.USER_SERVICE) private readonly userServiceClient: ClientGrpcProxy) {}

  onModuleInit() {
    this.userServiceGrpc = this.userServiceClient.getService<ICustomerServiceGrpc>(EGrpcClientService.USER_SERVICE);
  }

  async findById(data: IId): Promise<Customer> {
    const result = await lastValueFrom(this.userServiceGrpc.findById(data));
    return result;
  }

  async findByUserId(data: IId): Promise<Customer> {
    const result = await lastValueFrom(this.userServiceGrpc.findById(data));
    return result;
  }

  async findAll(query: IQueryV2): Promise<UserPaginationResponse> {
    const result = await lastValueFrom(this.userServiceGrpc.findAll(query));
    return result;
  }

  async create(data: CreateUserInputDto): Promise<Customer> {
    const result = await lastValueFrom(this.userServiceGrpc.create(data));
    return result;
  }

  async update(data: any): Promise<Customer> {
    const result = await lastValueFrom(this.userServiceGrpc.update(data));
    return result;
  }

  async destroy(id: IId): Promise<ICount> {
    const result = await lastValueFrom(this.userServiceGrpc.destroy(id));
    return result;
  }
}
