import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientGrpcProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

import { EGrpcClientService } from '../../enums';

import { MerchantService } from './merchant.service';

@Module({
  imports: [ConfigModule],
  providers: [
    MerchantService,
    {
      provide: EGrpcClientService.MERCHANT_SERVICE,
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('MERCHANTS_SVC_URL'),
            package: ['merchant', 'merchant_branch'],
            protoPath: [
              join(__dirname, '/../../protos/merchant.proto'),
              join(__dirname, '/../../protos/merchant_branch.proto'),
            ],
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
  exports: [MerchantService, EGrpcClientService.MERCHANT_SERVICE],
})
export class MerchantModule {}
