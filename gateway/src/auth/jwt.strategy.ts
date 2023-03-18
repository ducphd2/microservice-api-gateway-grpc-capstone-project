import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit, Inject, Logger } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';

import { get } from 'lodash';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IUserServiceGrpc } from './interfaces/authServiceGrpc';
import { User } from '../types';
import { EGrpcClientService } from '../enums/grpc-services.enum';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') implements OnModuleInit {
  private usersService: IUserServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.USER_SERVICE)
    private readonly usersServiceClient: ClientGrpcProxy,

    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_PRIVATE_KEY'),
      issuer: configService.get<string>('JWT_ISSUER'),
      audience: configService.get<string>('JWT_AUDIENCE'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  onModuleInit(): void {
    this.usersService = this.usersServiceClient.getService<IUserServiceGrpc>(EGrpcClientService.USER_SERVICE);
  }

  async validate(payload: any): Promise<User> {
    const user = await lastValueFrom(this.usersService.findById({ id: Number(payload.sub) }));
    return user;
  }
}
