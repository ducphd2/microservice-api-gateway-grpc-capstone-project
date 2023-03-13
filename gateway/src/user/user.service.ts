import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IId } from '../commons/commons.interface';
import { User } from '../types';
import { Profile } from '../types/profile.type';
import { InputPermissionRequest } from './dtos/inputPermissionRequest.dto';
import { IUserServiceGrpc, ResponsePermission, UpdateDataRequest } from './interfaces/userServiceGrpc';

@Injectable()
export class UserService {
  private userService: IUserServiceGrpc;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserServiceGrpc>('UserServiceGrpc');
  }

  async isAdmin(dataInput: InputPermissionRequest): Promise<ResponsePermission> {
    return await lastValueFrom(this.userService.isAdmin(dataInput));
  }

  async findById(id: IId): Promise<{ user: User; profile: Profile }> {
    return await lastValueFrom(this.userService.findById(id));
  }

  async update(updateData: UpdateDataRequest): Promise<{ user: User; profile: Profile }> {
    return await lastValueFrom(this.userService.update(updateData));
  }
}
