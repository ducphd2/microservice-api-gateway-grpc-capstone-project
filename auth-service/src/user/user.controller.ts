import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import {
  InputLoginRequest,
  InputRegisterUserRequest,
} from '../interfaces/user';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @GrpcMethod('AuthServiceGrpc', 'login')
  async login(data: InputLoginRequest) {
    return await this.userService.login(data);
  }

  @GrpcMethod('AuthServiceGrpc', 'register')
  async register(data: InputRegisterUserRequest) {
    return await this.userService.register(data);
  }
}
