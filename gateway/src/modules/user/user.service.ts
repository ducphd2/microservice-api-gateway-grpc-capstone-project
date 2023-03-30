import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums';
import { ICount, IId, IQueryV2 } from '../../interfaces';
import { IUserServiceGrpc } from '../../interfaces/users';
import {
  BranchServicePaginationResponse,
  CreateBranchServiceInput,
  CreateUserInputDto,
  UpdateBranchService,
  User,
  UserPaginationResponse,
} from '../../types';
import { UpdateDataRequest } from './interfaces';

@Injectable()
export class UserService {
  private userServiceGrpc: IUserServiceGrpc;
  constructor(@Inject(EGrpcClientService.USER_SERVICE) private readonly userServiceClient: ClientGrpcProxy) {}

  onModuleInit() {
    this.userServiceGrpc = this.userServiceClient.getService<IUserServiceGrpc>(EGrpcClientService.USER_SERVICE);
  }

  async findById(data: IId): Promise<User> {
    const result = await lastValueFrom(this.userServiceGrpc.findById(data));
    return result;
  }

  async findAll(query: IQueryV2): Promise<UserPaginationResponse> {
    const result = await lastValueFrom(this.userServiceGrpc.findAll(query));
    return result;
  }

  async create(data: CreateUserInputDto): Promise<User> {
    const result = await lastValueFrom(this.userServiceGrpc.create(data));
    return result;
  }

  async update(data: UpdateDataRequest): Promise<User> {
    const result = await lastValueFrom(this.userServiceGrpc.update(data));
    return result;
  }

  async destroy(id: IId): Promise<ICount> {
    const result = await lastValueFrom(this.userServiceGrpc.destroy(id));
    return result;
  }
}
