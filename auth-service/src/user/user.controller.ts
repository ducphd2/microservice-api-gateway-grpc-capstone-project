import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import {
  InputLoginRequest,
  InputRegisterUserRequest,
} from '../interfaces/user';
import { IId } from '../interfaces';
import { Profile, User } from '../database/entities';
import { IUser } from '../interfaces/user/user.interface';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @GrpcMethod('UserServiceGrpc', 'login')
  async login(data: InputLoginRequest) {
    return await this.userService.login(data);
  }

  @GrpcMethod('UserServiceGrpc', 'register')
  async register(data: InputRegisterUserRequest) {
    return await this.userService.register(data);
  }

  @GrpcMethod('UserServiceGrpc', 'findById')
  async findById(data: IId): Promise<{ user: User; profile: Profile }> {
    return await this.userService.findById(data.id);
  }

  @GrpcMethod('UserServiceGrpc', 'update')
  async update(data: IUser): Promise<{ user: User; profile: Profile }> {
    const result = await this.userService.update(data);
    return result;
  }
}
