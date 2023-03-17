import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientGrpcProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { InputPermissionRequest } from './dtos/inputPermissionRequest.dto';
import { IUserServiceGrpc, ResponsePermission, UpdateDataRequest } from './interfaces/userServiceGrpc';
import { IId } from '../../commons/commons.interface';
import { User } from '../../types';
import { Profile } from '../../types/profile.type';
import { EGrpcClientService } from '../../enums/grpc-services.enum';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: IUserServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.USER_SERVICE)
    private readonly usersServiceClient: ClientGrpcProxy,
  ) {}

  onModuleInit() {
    this.userService = this.usersServiceClient.getService<IUserServiceGrpc>('UserServiceGrpc');
  }

  async isAdmin(dataInput: InputPermissionRequest): Promise<ResponsePermission> {
    return await lastValueFrom(this.userService.isAdmin(dataInput));
  }

  async findById(id: IId): Promise<User> {
    return await lastValueFrom(this.userService.findById(id));
  }

  async update(updateData: UpdateDataRequest): Promise<{ user: User; profile: Profile }> {
    return await lastValueFrom(this.userService.update(updateData));
  }
}
