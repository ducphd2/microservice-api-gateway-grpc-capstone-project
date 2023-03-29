import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientGrpcProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { EGrpcClientService } from '../../enums';
import { UtilsModule } from '../../utils/utils.module';
import { MerchantBranchModule } from '../branches/branches.module';
import { MerchantFieldResolver } from './merchants-field.resolver';
import { MerchantMutationResolver } from './merchants-mutation.resolver';
import { MerchantQueryResolver } from './merchants-query.resolver';
import { MerchantService } from './merchants.service';

@Module({
  imports: [ConfigModule, UtilsModule, MerchantBranchModule],
  providers: [
    MerchantFieldResolver,
    MerchantQueryResolver,
    MerchantMutationResolver,
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
