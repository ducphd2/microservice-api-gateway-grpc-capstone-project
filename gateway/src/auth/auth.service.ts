import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MerchantServiceGrpc } from '../merchant/interfaces/merchantServiceGrpc';
import { InputLoginRequest } from './dtos/inputLoginRequest.dto';
import { InputPermissionRequest } from './dtos/inputPermissionRequest.dto';
import { InputRegisterRequest } from './dtos/inputRegisterRequest.dto';
import { AuthServiceGrpc, ResponseAuthFromGrpc, ResponsePermission } from './interfaces/authServiceGrpc';
import { MerchantService } from '../merchant/merchant.service';

@Injectable()
export class AuthService {
  private authService: AuthServiceGrpc;
  // private merchantService: MerchantServiceGrpc;

  constructor(
    @Inject('AUTH_PACKAGE') private client: ClientGrpc,
    // @Inject('MERCHANT_PACKAGE') private merchantClient: ClientGrpc,
    private readonly merchantService: MerchantService,
  ) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceGrpc>('AuthServiceGrpc');
    // this.merchantService = this.merchantClient.getService<MerchantServiceGrpc>('MerchantServiceGrpc');
  }

  async login(loginInput: InputLoginRequest): Promise<ResponseAuthFromGrpc> {
    return await lastValueFrom(await this.authService.login(loginInput));
  }

  async register(registerInput: InputRegisterRequest): Promise<ResponseAuthFromGrpc> {
    const { user, profile, accessToken } = await lastValueFrom(this.authService.register(registerInput));

    const { merchant, merchantBranch } = await this.merchantService.create({ ...registerInput, profileId: profile.id });

    return {
      merchant,
      merchantBranch,
      user,
      profile,
      accessToken,
    };
  }

  async isAdmin(dataInput: InputPermissionRequest): Promise<ResponsePermission> {
    return await lastValueFrom(await this.authService.isAdmin(dataInput));
  }
}
