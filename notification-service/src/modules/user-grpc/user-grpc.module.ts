import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientGrpcProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

import { EGrpcClientService } from '../../enums';

import { UserGrpcService } from './user-grpc.service';

@Module({
  imports: [ConfigModule],
  providers: [
    UserGrpcService,
    {
      provide: EGrpcClientService.USER_SERVICE,
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('USERS_SVC_URL'),
            package: ['user'],
            protoPath: [join(__dirname, '/../../protos/user.proto')],
            loader: {
              keepCase: true,
              enums: String,
              oneofs: true,
              arrays: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: EGrpcClientService.CUSTOMER_SERVICE,
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('USERS_SVC_URL'),
            package: ['customer'],
            protoPath: [join(__dirname, '/../../protos/customer.proto')],
            loader: {
              keepCase: true,
              enums: String,
              oneofs: true,
              arrays: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [UserGrpcService, EGrpcClientService.USER_SERVICE, EGrpcClientService.CUSTOMER_SERVICE],
})
export class UserGrpcModule {}
