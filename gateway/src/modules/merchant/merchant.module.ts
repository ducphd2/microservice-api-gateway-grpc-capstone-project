import { Module } from '@nestjs/common';
import { ClientGrpcProxy, ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MerchantResolver } from './merchant.resolver';
import { MerchantService } from './merchant.service';
import { MerchantQueryResolver } from './merchant-query.resolver';
import { EGrpcClientService } from '../../enums';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UtilsModule } from '../../utils/utils.module';

@Module({
  imports: [ConfigModule, UtilsModule],
  providers: [
    MerchantResolver,
    MerchantQueryResolver,
    MerchantService,
    {
      provide: EGrpcClientService.MERCHANT_SERVICE,
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('MERCHANTS_SVC_URL'),
            package: 'merchant',
            protoPath: join(__dirname, '/../../protos/merchant.proto'),
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
