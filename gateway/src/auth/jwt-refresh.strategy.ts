import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';

import { get } from 'lodash';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { EGrpcClientService } from '../enums/grpc-services.enum';
import { IUserServiceGrpc } from './interfaces/authServiceGrpc';
import { User } from '../types';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') implements OnModuleInit {
  constructor(
    @Inject(EGrpcClientService.USER_SERVICE)
    private readonly usersServiceClient: ClientGrpcProxy,

    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      issuer: configService.get<string>('JWT_ISSUER'),
      audience: configService.get<string>('JWT_AUDIENCE'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  private usersService: IUserServiceGrpc;

  onModuleInit(): void {
    this.usersService = this.usersServiceClient.getService<IUserServiceGrpc>('UserServiceGrpc');
  }

  async validate(payload: any): Promise<User> {
    return await lastValueFrom(this.usersService.findById({ id: payload.sub }));
  }
}
