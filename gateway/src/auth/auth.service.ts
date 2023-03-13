import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MerchantService } from '../merchant/merchant.service';
import { InputLoginRequest } from './dtos/inputLoginRequest.dto';
import { InputPermissionRequest } from './dtos/inputPermissionRequest.dto';
import { InputRegisterRequest } from './dtos/inputRegisterRequest.dto';
import { UserServiceGrpc, ResponseAuthFromGrpc, ResponsePermission } from './interfaces/authServiceGrpc';

@Injectable()
export class AuthService {
  private authService: UserServiceGrpc;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc, private readonly merchantService: MerchantService) {}

  onModuleInit() {
    this.authService = this.client.getService<UserServiceGrpc>('UserServiceGrpc');
  }

  async login(loginInput: InputLoginRequest): Promise<ResponseAuthFromGrpc> {
    return await lastValueFrom(this.authService.login(loginInput));
  }

  async register(registerInput: InputRegisterRequest): Promise<ResponseAuthFromGrpc> {
    const { user, profile, accessToken } = await lastValueFrom(this.authService.register(registerInput));

    const { merchant, merchantBranch } = await this.merchantService.create({ ...registerInput, profileId: profile.id });

    return {
      merchant,
      merchantBranch,
      user: {
        ...user,
        profile: profile,
      },
      accessToken,
    };
  }

  async isAdmin(dataInput: InputPermissionRequest): Promise<ResponsePermission> {
    return await lastValueFrom(await this.authService.isAdmin(dataInput));
  }
}
